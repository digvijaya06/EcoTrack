const ChallengeParticipation = require('../models/ChallengeParticipation');
const Challenge = require('../models/Challenge');

// Get all challenge participations (for admin)
exports.getAllParticipations = async (req, res) => {
  try {
    // Find participations where user is not admin
    const participations = await ChallengeParticipation.find()
      .populate({
        path: 'user',
        select: 'name email isAdmin',
        match: { isAdmin: false }
      })
      .populate('challenge', 'title description cost')
      .exec();

    // Filter out participations where user is null (i.e., admin users filtered out)
    const filteredParticipations = participations.filter(p => p.user !== null);

    console.log('Fetched participations:', JSON.stringify(filteredParticipations, null, 2));
    res.json(filteredParticipations);
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
