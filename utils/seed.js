const connection = require('../config/connection');
const { User, Thought, Reaction } = require('../models');

const userSeed = ([
    { username: 'Ryu', email: 'dragonpunch@worldwarrior.org' },
    { username: 'Ken', email: 'kmasters@aol.com' },
    { username: 'Zangief', email: 'bearwrestler@siberia.ru' },
    { username: 'Dhalsim', email: 'yogaflame@modernbuddha.in' },
    { username: 'Blanka', email: 'shocking@rollingball.br' },
    { username: 'Chun Li', email: 'spinningbird@interpol.int' },
    { username: 'Guile', email: 'sonicboom@airforce.mil' },
    { username: 'E. Honda', email: 'sumosplash@kokugikan.jp' },
  ]);

const thoughtSeed = ([
    { thoughtText: 'You must defeat Sheng Long to stand a chance.', username: 'Ryu' },
    { thoughtText: 'Attack me if you dare, I will crush you.', username: 'Ken' },
    { thoughtText: 'My strength is much greater than yours.', username: 'Zangief' },
    { thoughtText: 'I will meditate and then destroy you.', username: 'Dhalsim' },
    { thoughtText: 'Seeing you in action is a joke.', username: 'Blanka' },
    { thoughtText: "I'm the strong woman in the world", username: 'Chun Li' },
    { thoughtText: 'Are you man enough to fight with me?', username: 'Guile' },
    { thoughtText: "Can't you do better than that?", username: 'E. Honda' },
  ]);

connection.on('error', (err) => err);

connection.once('open', async () => { // Creates the connection and drops any existing data in the DB
  console.log('Connected');
  await User.deleteMany({});
  await Thought.deleteMany({});
  console.log('DB ready for seeding.');

  const workingUsers = [];  // Working arrays so we can populate the arrays then push to the database
  const workingThoughts = [];

  for (let i = 0; i < userSeed.length; i++) { // Populates the workingUsers array and creates the documents in the DB
    const currentUser = {
      username: userSeed[i].username,
      email: userSeed[i].email,
    };
    const newUser = await User.create(currentUser);
    workingUsers.push({
      _id: newUser._id.toString(),
      username: newUser.username,
    });
  }

  for (let i = 0; i < thoughtSeed.length; i++) {   // Populates the workingThoughts array and creates the documents in the DB
    const currentThought = {
      username: thoughtSeed[i].username,
      thoughtText: thoughtSeed[i].thoughtText,
    };
    const newThought = await Thought.create(currentThought);
    workingThoughts.push({
      _id: newThought._id.toString(),
      username: newThought.username,
    });
  }

   for (let i = 0; i < thoughtSeed.length; i++) {  // Intertwines the users and thoughts, building the "connection" between the two documents
    const userId = workingUsers.filter(
      (user) => user.username === thoughtSeed[i].username
    );
    console.log('USER ID', userId);
    const finishedUser = await User.findOneAndUpdate(
      { _id: userId[0]._id },
      { $push: { thoughts: workingThoughts[i]._id } },
      { new: true }
    );
    console.log(finishedUser);
  }

  console.info('Seeding finished.');

  process.exit(0);
});