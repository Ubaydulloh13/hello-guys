const ota = document.getElementById("ota");
const input = document.getElementById("input");
const sortSelect = document.getElementById("sort-select");
const select = document.getElementById("select");

let usersData = [];

fetch("https://dummyjson.com/users?limit=100")
  .then(res => res.json())
  .then(data => {
    usersData = data.users;
    chizish(usersData);
  });

function chizish(users) {
  ota.innerHTML = "";
  users.forEach(user => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${user.image}" alt="">
      <h2>${user.firstName} ${user.lastName}</h2>
      <h3>Email: ${user.email}</h3>
      <h3>Phone: ${user.phone}</h3>
      <h3>Gender: ${user.gender}</h3>
      <h3>Age: ${user.age}</h3>
    `;
    ota.appendChild(card);
  });
}


input.addEventListener("input",()=>{
  let a=usersData.filter(user=>user.firstName.toLowerCase().includes(input.value.toLowerCase()) || user.lastName.toLowerCase().includes(input.value.toLowerCase()))
  chizish(a);
});


sortSelect.addEventListener("change",()=>{
  if(sortSelect.value==="A-Z"){
    let b=usersData.sort((p1,p2)=> p1.name.localeCompare(p2.name));
    chizish(b);
  }
  else{
    let b=usersData.sort((p1,p2)=> p2.name.localeCompare(p1.name));
    chizish(b);
  }
});


select.addEventListener("change",()=>{
  if(select.value==="All"){
    chizish(usersData);
  }
  else{
    let is=usersData.filter(p=> p.weakness.join(", ").includes(select.value));
    chizish(is);
  }
});