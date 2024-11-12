import "./index.css";
import "./App.css";
const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function app() {
  return (
    <div className="app">

      <div className="sidebar">
        <FriendsList />
        <FormAddFriend />
        <Button>Add Friend</Button>

      </div>
      <FormSplitBill />
    </div>
  )

}


function FriendsList() {
  // 
  return (

    <ul>

      {initialFriends.map((friend) => <Friend friend={friend} />)}
    </ul>
  )
}



function Friend({ friend }) {
  // selected
  return (

    <li>
      <img src={friend.image} />

      {
        (friend.balance < 0) &&
        <p
          className="red"> you owe {friend.name} {Math.abs(friend.balance)}$
        </p>}
      {
        (friend.balance > 0) &&
        <p
          className="green"> {friend.name} owes you  {Math.abs(friend.balance)}$
        </p>}
      {
        (friend.balance === 0) &&
        <p
          className=""> you and {friend.name} are equal
        </p>}
      <Button>select</Button>

    </li>
  )
}

function FormAddFriend() {

  return (
    <form className="form-add-friend">

      <label>🕺Friend name</label>
      <input type="text" />

      <label>🕺Image URL</label>
      <input type="text" />
      <Button>Add</Button>
    </form>
  )
}

function FormSplitBill() {
  // 
  return (
    <form className="form-split-bill">
      <h2>spill the bill with xxxxx</h2>
      <label>🕺Bill value</label>
      <input type="text" />


      <label>🕺your expense</label>
      <input type="text" />


      <label>🕺XXXXX's expense</label>
      <input type="text" disabled/>


      <label>🕺who is paying the bill</label>
      <select>
      <option value="you">you</option>
      <option value="X">X</option>

      </select>
      <Button>Split the bill</Button>

    </form>


  )
}


function Button({ children }) {
  // Class name: button
  return (<button className="button">{children}</button>)
}

