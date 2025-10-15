const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");

describe("UserProgress", function () {
  async function deployUserProgressFixture() {
    const [owner, user1, user2, user3] = await ethers.getSigners();

    const UserProgress = await ethers.getContractFactory("UserProgress");
    const userProgress = await UserProgress.deploy();

    return { userProgress, owner, user1, user2, user3 };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { userProgress, owner } = await loadFixture(deployUserProgressFixture);
      expect(await userProgress.owner()).to.equal(owner.address);
    });

    it("Should initialize with correct default values", async function () {
      const { userProgress } = await loadFixture(deployUserProgressFixture);
      expect(await userProgress.owner()).to.not.equal(ethers.ZeroAddress);
    });
  });

  describe("User Registration", function () {
    it("Should allow users to register with a username", async function () {
      const { userProgress, user1 } = await loadFixture(deployUserProgressFixture);
      
      await expect(userProgress.connect(user1).registerUser("Alice"))
        .to.emit(userProgress, "UserRegistered")
        .withArgs(user1.address, "Alice");
      
      const userData = await userProgress.getUserProgress(user1.address);
      expect(userData.username).to.equal("Alice");
      expect(userData.isActive).to.be.true;
      expect(userData.totalPoints).to.equal(0);
    });

    it("Should not allow the same user to register twice", async function () {
      const { userProgress, user1 } = await loadFixture(deployUserProgressFixture);
      
      await userProgress.connect(user1).registerUser("Alice");
      
      await expect(userProgress.connect(user1).registerUser("Alice2"))
        .to.be.revertedWith("User already registered");
    });

    it("Should allow different users to register with the same username", async function () {
      const { userProgress, user1, user2 } = await loadFixture(deployUserProgressFixture);
      
      await userProgress.connect(user1).registerUser("Alice");
      await userProgress.connect(user2).registerUser("Alice");
      
      const user1Data = await userProgress.getUserProgress(user1.address);
      const user2Data = await userProgress.getUserProgress(user2.address);
      
      expect(user1Data.username).to.equal("Alice");
      expect(user2Data.username).to.equal("Alice");
    });
  });

  describe("Lesson Completion", function () {
    it("Should allow registered users to complete lessons", async function () {
      const { userProgress, user1 } = await loadFixture(deployUserProgressFixture);
      
      await userProgress.connect(user1).registerUser("Alice");
      
      await expect(userProgress.connect(user1).completeLesson("lesson-1"))
        .to.emit(userProgress, "LessonCompleted")
        .withArgs(user1.address, "lesson-1")
        .and.to.emit(userProgress, "PointsEarned")
        .withArgs(user1.address, 100);
      
      const isCompleted = await userProgress.isLessonCompleted(user1.address, "lesson-1");
      expect(isCompleted).to.be.true;
      
      const userData = await userProgress.getUserProgress(user1.address);
      expect(userData.totalPoints).to.equal(100);
    });

    it("Should not allow unregistered users to complete lessons", async function () {
      const { userProgress, user1 } = await loadFixture(deployUserProgressFixture);
      
      await expect(userProgress.connect(user1).completeLesson("lesson-1"))
        .to.be.revertedWith("User not registered");
    });

    it("Should not allow users to complete the same lesson twice", async function () {
      const { userProgress, user1 } = await loadFixture(deployUserProgressFixture);
      
      await userProgress.connect(user1).registerUser("Alice");
      await userProgress.connect(user1).completeLesson("lesson-1");
      
      await expect(userProgress.connect(user1).completeLesson("lesson-1"))
        .to.be.revertedWith("Lesson already completed");
    });
  });

  describe("Step Completion", function () {
    it("Should allow registered users to complete steps", async function () {
      const { userProgress, user1 } = await loadFixture(deployUserProgressFixture);
      
      await userProgress.connect(user1).registerUser("Alice");
      
      await expect(userProgress.connect(user1).completeStep("step-1", "course-1"))
        .to.emit(userProgress, "StepCompleted")
        .withArgs(user1.address, "step-1", "course-1")
        .and.to.emit(userProgress, "PointsEarned")
        .withArgs(user1.address, 10);
      
      const isCompleted = await userProgress.isStepCompleted(user1.address, "step-1");
      expect(isCompleted).to.be.true;
      
      const userData = await userProgress.getUserProgress(user1.address);
      expect(userData.totalPoints).to.equal(10);
    });

    it("Should not allow unregistered users to complete steps", async function () {
      const { userProgress, user1 } = await loadFixture(deployUserProgressFixture);
      
      await expect(userProgress.connect(user1).completeStep("step-1", "course-1"))
        .to.be.revertedWith("User not registered");
    });

    it("Should not allow users to complete the same step twice", async function () {
      const { userProgress, user1 } = await loadFixture(deployUserProgressFixture);
      
      await userProgress.connect(user1).registerUser("Alice");
      await userProgress.connect(user1).completeStep("step-1", "course-1");
      
      await expect(userProgress.connect(user1).completeStep("step-1", "course-1"))
        .to.be.revertedWith("Step already completed");
    });

    it("Should update course progress when completing steps", async function () {
      const { userProgress, user1 } = await loadFixture(deployUserProgressFixture);
      
      await userProgress.connect(user1).registerUser("Alice");
      await userProgress.connect(user1).completeStep("step-1", "course-1");
      
      const courseProgress = await userProgress.getCourseProgress(user1.address, "course-1");
      expect(courseProgress.completedSteps).to.equal(1);
      expect(courseProgress.totalSteps).to.equal(0); // Not set yet
      expect(courseProgress.completionPercentage).to.equal(0); // 0/0 = 0
    });
  });

  describe("Course Progress Calculation", function () {
    it("Should calculate progress percentage correctly", async function () {
      const { userProgress, user1, owner } = await loadFixture(deployUserProgressFixture);
      
      await userProgress.connect(user1).registerUser("Alice");
      
      // Set total steps for the course (only owner can do this)
      await userProgress.connect(owner).setCourseTotalSteps("course-1", 5);
      
      // Complete 3 out of 5 steps
      await userProgress.connect(user1).completeStep("step-1", "course-1");
      await userProgress.connect(user1).completeStep("step-2", "course-1");
      await userProgress.connect(user1).completeStep("step-3", "course-1");
      
      const courseProgress = await userProgress.getCourseProgress(user1.address, "course-1");
      expect(courseProgress.completedSteps).to.equal(3);
      expect(courseProgress.totalSteps).to.equal(5);
      expect(courseProgress.completionPercentage).to.equal(60); // 3/5 * 100 = 60
    });

    it("Should return 0% progress when total steps is 0", async function () {
      const { userProgress, user1 } = await loadFixture(deployUserProgressFixture);
      
      await userProgress.connect(user1).registerUser("Alice");
      await userProgress.connect(user1).completeStep("step-1", "course-1");
      
      const percentage = await userProgress.calculateCourseProgress(user1.address, "course-1");
      expect(percentage).to.equal(0);
    });

    it("Should return 100% progress when all steps are completed", async function () {
      const { userProgress, user1, owner } = await loadFixture(deployUserProgressFixture);
      
      await userProgress.connect(user1).registerUser("Alice");
      
      // Set total steps
      await userProgress.connect(owner).setCourseTotalSteps("course-1", 2);
      
      // Complete all steps
      await userProgress.connect(user1).completeStep("step-1", "course-1");
      await userProgress.connect(user1).completeStep("step-2", "course-1");
      
      const courseProgress = await userProgress.getCourseProgress(user1.address, "course-1");
      expect(courseProgress.completionPercentage).to.equal(100);
    });
  });

  describe("Access Control", function () {
    it("Should only allow owner to call setCourseTotalSteps", async function () {
      const { userProgress, user1 } = await loadFixture(deployUserProgressFixture);
      
      await userProgress.connect(user1).registerUser("Alice");
      
      await expect(userProgress.connect(user1).setCourseTotalSteps("course-1", 5))
        .to.be.revertedWith("Only owner can call this function");
    });

    it("Should allow owner to call setCourseTotalSteps", async function () {
      const { userProgress, owner } = await loadFixture(deployUserProgressFixture);
      
      await expect(userProgress.connect(owner).setCourseTotalSteps("course-1", 5))
        .not.to.be.reverted;
    });
  });

  describe("Edge Cases", function () {
    it("Should handle empty strings for lesson and step IDs", async function () {
      const { userProgress, user1 } = await loadFixture(deployUserProgressFixture);
      
      await userProgress.connect(user1).registerUser("Alice");
      
      // Should not revert with empty strings
      await expect(userProgress.connect(user1).completeLesson(""))
        .to.emit(userProgress, "LessonCompleted");
      
      await expect(userProgress.connect(user1).completeStep("", ""))
        .to.emit(userProgress, "StepCompleted");
    });

    it("Should handle multiple courses for the same user", async function () {
      const { userProgress, user1 } = await loadFixture(deployUserProgressFixture);
      
      await userProgress.connect(user1).registerUser("Alice");
      
      // Complete steps in different courses
      await userProgress.connect(user1).completeStep("step-1", "course-1");
      await userProgress.connect(user1).completeStep("step-1", "course-2");
      
      const progress1 = await userProgress.getCourseProgress(user1.address, "course-1");
      const progress2 = await userProgress.getCourseProgress(user1.address, "course-2");
      
      expect(progress1.completedSteps).to.equal(1);
      expect(progress2.completedSteps).to.equal(1);
    });

    it("Should handle large numbers of points correctly", async function () {
      const { userProgress, user1 } = await loadFixture(deployUserProgressFixture);
      
      await userProgress.connect(user1).registerUser("Alice");
      
      // Complete multiple lessons and steps
      for (let i = 1; i <= 10; i++) {
        await userProgress.connect(user1).completeLesson(`lesson-${i}`);
        await userProgress.connect(user1).completeStep(`step-${i}`, "course-1");
      }
      
      const userData = await userProgress.getUserProgress(user1.address);
      expect(userData.totalPoints).to.equal(1100); // 10 lessons * 100 + 10 steps * 10
    });
  });

  describe("Events", function () {
    it("Should emit all required events with correct parameters", async function () {
      const { userProgress, user1 } = await loadFixture(deployUserProgressFixture);
      
      // Test UserRegistered event
      await expect(userProgress.connect(user1).registerUser("Alice"))
        .to.emit(userProgress, "UserRegistered")
        .withArgs(user1.address, "Alice");
      
      // Test LessonCompleted and PointsEarned events
      await expect(userProgress.connect(user1).completeLesson("lesson-1"))
        .to.emit(userProgress, "LessonCompleted")
        .withArgs(user1.address, "lesson-1")
        .and.to.emit(userProgress, "PointsEarned")
        .withArgs(user1.address, 100);
      
      // Test StepCompleted event
      await expect(userProgress.connect(user1).completeStep("step-1", "course-1"))
        .to.emit(userProgress, "StepCompleted")
        .withArgs(user1.address, "step-1", "course-1")
        .and.to.emit(userProgress, "PointsEarned")
        .withArgs(user1.address, 10);
    });
  });
});
