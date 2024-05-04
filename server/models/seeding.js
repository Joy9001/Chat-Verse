const { User, UserInfo, UserLinks } = require("./users.model");
const Follower = require("./follower.model");
const connectMongo = require("../db/connectMongo.db");
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });
const numUsers = 20;

const jsonData = require("../Node.users.json");

// console.log(jsonData);

// console.log(process.env.MONGO_DB_URI);

//seeds
// const userSeeding = async () => {
// 	const users = [];
// 	for (let i = 0; i < numUsers; i++) {
// 		users.push({
// 			fullName: `User ${i + 1}`,
// 			username: `user${i + 1}`,
// 			password: `password${i + 1}`,
// 			email: `user${i + 1}@gmail.com`,
// 			phone: `+1234567890${i + 1}`,
// 		});
// 	}
// 	await User.insertMany(users);
// };

// connectMongo().then(() => {
// 	userSeeding().then(() => {
// 		console.log("Seeding complete");
// 	});
// });

const idArray = jsonData.map((item) => item._id.$oid);

// console.log(idArray);

function formatDate(date) {
	const day = date.getDate().toString().padStart(2, "0");
	const month = (date.getMonth() + 1).toString().padStart(2, "0");
	const year = date.getFullYear();

	return `${day}/${month}/${year}`;
}

// const userInfoSeeding = async () => {
// 	const userInfos = [];
// 	for (let i = 0; i < numUsers; i++) {
// 		userInfos.push({
// 			userId: idArray[i],
// 			bio: `Bio ${i + 1}`,
// 			profession: `Profession ${i + 1}`,
// 			birthday: formatDate(
// 				new Date(Math.floor(Math.random() * 1000000000000))
// 			),
// 			state: `State ${i + 1}`,
// 			country: `Country ${i + 1}`,
// 		});
// 	}
// 	await UserInfo.insertMany(userInfos);
// };

// connectMongo().then(() => {
// 	userInfoSeeding().then(() => {
// 		console.log("Seeding complete");
// 	});
// });

// const userLinksSeeding = async () => {
// 	const userLinks = [];
// 	for (let i = 0; i < numUsers; i++) {
// 		userLinks.push({
// 			userId: idArray[i],
// 			twitter: `Twitter ${i + 1}`,
// 			facebook: `Facebook ${i + 1}`,
// 			linkedin: `LinkedIn ${i + 1}`,
// 			instagram: `Instagram ${i + 1}`,
// 		});
// 	}
// 	await UserLinks.insertMany(userLinks);
// };

// connectMongo().then(() => {
// 	userLinksSeeding().then(() => {
// 		console.log("Seeding complete");
// 	});
// });

// const followerSeeding = async () => {
// 	const followers = [];
// 	for (let i = 0; i < numUsers; i++) {
// 		followers.push({
// 			userId: idArray[i],
// 			followers: idArray.filter((id) => id !== idArray[i]),
// 			followerCount: idArray.filter((id) => id !== idArray[i]).length,
// 			following: idArray.filter((id) => id !== idArray[i]),
// 			followingCount: idArray.filter((id) => id !== idArray[i]).length,
// 		});
// 	}
// 	await Follower.insertMany(followers);
// };

// connectMongo().then(() => {
// 	followerSeeding().then(() => {
// 		console.log("Seeding complete");
// 	});
// });
