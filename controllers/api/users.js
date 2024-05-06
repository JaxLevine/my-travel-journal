const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../models/user');

module.exports = {
  create,
  login,
  checkToken,
  follow,
  unfollow,
  getAllUsers,
  searchUsers
};

function checkToken(req, res) {
  console.log(req.user);
  res.json(req.exp);
}

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error();
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error();
    const token = createJWT(user);
    res.json(token);
  } catch {
    res.status(400).json('Bad Credentials');
  }
}

async function create(req, res) {
  try {
    const user = await User.create(req.body);
    const token = createJWT(user);
    res.json(token);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function follow(req, res) {
  try {
    const currentUser = await User.findById(req.user._id);
    const userToFollow = await User.findById(req.params.userId);

    if (!userToFollow) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (currentUser.following.includes(userToFollow._id)) {
      return res.status(400).json({ message: 'You are already following this user' });
    }

    currentUser.following.push(userToFollow._id);
    await currentUser.save();

    res.json({ message: `You are now following ${userToFollow.name}` });
  } catch (err) {
    res.status(500).json(err);
  }
}

async function unfollow(req, res) {
  try {
    const currentUser = await User.findById(req.user._id);
    const userToUnfollow = await User.findById(req.params.userId);

    if (!userToUnfollow) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!currentUser.following.includes(userToUnfollow._id)) {
      return res.status(400).json({ message: 'You are not following this user' });
    }

    currentUser.following = currentUser.following.filter(id => id.toString() !== userToUnfollow._id.toString());
    await currentUser.save();

    res.json({ message: `You have unfollowed ${userToUnfollow.name}` });
  } catch (err) {
    res.status(500).json(err);
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await User.find({}, 'name email');
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
}

async function searchUsers(req, res) {
  try {
    const query = req.query.q;
    const users = await User.find(
      {
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { email: { $regex: query, $options: 'i' } }
        ]
      },
      'name email'
    );
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
}

/*-- Helper Functions --*/
function createJWT(user) {
  return jwt.sign(
    { user },
    process.env.SECRET,
    { expiresIn: '24h' }
  );
}