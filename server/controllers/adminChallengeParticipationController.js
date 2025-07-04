const ChallengeParticipation = require('../models/ChallengeParticipation');

exports.getAllParticipations = async (req, res) => {
  try {
    // Find all participations without filtering user or challenge
    const participations = await ChallengeParticipation.find()
      .populate('user', 'name email isAdmin')
      .populate('challenge', 'title description cost')
      .exec();

    console.log('Fetched participations:', JSON.stringify(participations, null, 2));
    res.json(participations);
  } catch (error) {
    console.error('Error fetching participations:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


const RewardClaim = require('../models/RewardClaim');
const ActionRewardMapping = require('../models/ActionRewardMapping');
const Reward = require('../models/Reward');

// Approve a challenge participation
exports.approveParticipation = async (req, res) => {
  try {
    const { id } = req.params;
    const participation = await ChallengeParticipation.findById(id);
    if (!participation) {
      return res.status(404).json({ message: 'Participation not found' });
    }
    participation.status = 'approved';
    await participation.save();

    // Find reward linked to the challenge participation via ActionRewardMapping
    // Assuming challenge participation is linked to an action (need to define how)
    // For demo, find reward for an action linked to the challenge (if any)
    const actionRewardMapping = await ActionRewardMapping.findOne({ action: participation.challenge });
    if (actionRewardMapping) {
      // Create a RewardClaim for the user with status 'Approved'
      const rewardClaim = new RewardClaim({
        user: participation.user,
        reward: actionRewardMapping.reward,
        status: 'Approved',
        claimedAt: new Date(),
        approvedAt: new Date(),
      });
      await rewardClaim.save();
      return res.json({ participation, rewardClaim });
    }

    res.json(participation);
  } catch (error) {
    console.error('Error approving participation:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Reject a challenge participation
exports.rejectParticipation = async (req, res) => {
  try {
    const { id } = req.params;
    const participation = await ChallengeParticipation.findById(id);
    if (!participation) {
      return res.status(404).json({ message: 'Participation not found' });
    }
    participation.status = 'rejected';
    await participation.save();
    res.json(participation);
  } catch (error) {
    console.error('Error rejecting participation:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
