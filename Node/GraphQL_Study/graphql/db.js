export const people = [
    {
        id: 1,
        name: "dnatuna",
        age: 23,
        gender: "male"
    }
];

export const getById = (id) => {
    const filteredPeople = people.filter(person => person.id === id);
    return filteredPeople[0];
}