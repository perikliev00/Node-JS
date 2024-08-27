// Refreshing functons
// const name = "Alex";
// let age = 29;
// const hasHobbies = true;
// age=24;

// const summarizeUser=(userName, userAge, userHasHobby) => {
//     return (
//         'Name is ' + 
//         userName +
//         ' ,age is ' +
//         userAge +
//         ' and the user has hobbies: ' +
//         userHasHobby
//         );
// };
// // const add = (a,b) => a + b;
// // const addOne = a => a + 1
// const addRandom = () => 1+2
// // console.log(add(1,2))
// // console.log(addOne(1))
// console.log(addRandom());
// console.log(summarizeUser(name,age,hasHobbies))
// Object refresher
// const person = {
//     name: 'Alex',
//     age : 24,
//     greet() {
//         console.log('Hi i am '+ this.name);
//     }
// }
// person.greet();
//Arrays
// const hobbies= ['Sports','Cooking'];
// for (let hobby of hobbies) {
//   console.log(hobby)
// }
// console.log(hobbies.map(hobby => 'Hobby:' + hobby));
// console.log(hobbies);
// Spread & Rest operator
// const coppiedArray = [...hobbies];
// console.log(coppiedArray);
// const toArray = (...args) => {
//     return args;
// }
// console.log(toArray(1,2,3,4,5,6));
// const printName = ({ name }) => {
//     console.log(name);
// }
// printName(person);
// const { name, age } = person;
// console.log(name, age);
// [hobby1,hobby2] = hobbies;
// console.log(hobby1,hobby2);
// Async Code & Promises
const fetchData = () => {
    const promise = new Promise((resolve, reject) => {
        setTimeout(()=> {
            resolve('Done!');
        }, 1500);
    });
    return promise;
};
setTimeout(() => {
    console.log('Timer is done!');
    fetchData()
    .then(text => {
        console.log(text);
        return fetchData();
    })
    .then(text2 => {
        console.log(text2);
    });
}, 2000);
