const Subscription = require('../model/Subscription');

class SubscriptionController {
  
  // ➤ Create Subscription
  static async create(req, res) {
    try {
      const sub = new Subscription(req.body);
      await sub.save();
      res.status(201).json(sub);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // ➤ Get All Subscriptions
  static async getAll(req, res) {
    try {
      const subs = await Subscription.find();
      res.json(subs);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // ➤ Update Subscription
  static async update(req, res) {
    try {
      const sub = await Subscription.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(sub);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // ➤ Delete Subscription
  static async delete(req, res) {
    try {
      await Subscription.findByIdAndDelete(req.params.id);
      res.json({ message: "Deleted Successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // ➤ Auto disable expired subscriptions
  static async checkExpiry(req, res) {
    try {
      const today = new Date();
      await Subscription.updateMany(
        { expiryDate: { $lt: today.toISOString().slice(0, 10) } },
        { $set: { status: "inactive" } }
      );
      res.json({ message: "Expired subscriptions updated" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // ➤ ✅ Check plan status for a specific user
  static async checkUserPlanStatus(req, res) {
    try {
      const { userId } = req.params;
      const today = new Date().toISOString().slice(0, 10);

      const subscription = await Subscription.findOne({ userId }).sort({ expiryDate: -1 });

      if (!subscription) {
        return res.status(404).json({ message: "No subscription found" });
      }

      const planStatus =
        subscription.expiryDate < today ? "Expired" : "Active";

      res.json({
        planStatus,
        subscription
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  static async getSubscriptionInfo(req, res) {
    try {
      const { userId } = req.params;
      const today = new Date().toISOString().slice(0, 10);

      const subscription = await Subscription.findOne({ userId }).sort({ expiryDate: -1 });

      // if (!subscription) {
      //   return res.status(404).json({ message: "No subscription found" });
      // }

      const planStatus =
        subscription?.expiryDate < today ? "Expired" : "Active";

      res.json({
       
        subscription
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = SubscriptionController;
