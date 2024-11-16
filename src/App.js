import "./index.css";
import "./App.css";
import { useState } from "react";
import { fireEvent } from "@testing-library/react";
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

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null)

  function handelSplitBill(value){
    // console.log("🔥handel split")
   
   
    setFriends(
      friends=>friends.map(friend=>friend.id===selectedFriend.id?
        {...friend,balance:friend.balance+value}  :friend)
    )
    setSelectedFriend(null)//unselects the selected friend and then cloes the split bill form
  }

  function handedlSelection(friend) {
    setSelectedFriend(curentlySelected => curentlySelected === friend ? null : friend);
    setShowAddFriend(false);
    // setSelectedFriend(friend);
    // console.log("🔥selected friend is: "+selectedFriend)
 
  }
  function handedlShowAddFriend() {
    setShowAddFriend((showAddFriend) => !showAddFriend)
  }

  function handelAddFriend(newFriend) {
    setFriends([...friends, newFriend]);
  }
  return (
    <div className="app">

      <div className="sidebar">
        <FriendsList
          friends={friends}
          onSelectFriend={handedlSelection}
          selectedFriend={selectedFriend}
        // setFriends={setFriends}
        />
        {showAddFriend && <FormAddFriend onAddFriend={handelAddFriend} />}
        <Button onClick={handedlShowAddFriend}>{showAddFriend ? "Close" : "Add Friend"}</Button>

      </div>
      {selectedFriend && <FormSplitBill selectedFriend={selectedFriend} onSplitBill={handelSplitBill} />}
    </div>
  )

  function FormSplitBill({ selectedFriend,onSplitBill }) {
    // const payingDifferance = (whoIsPaying==="user")?(-1*paidByUser):paidByFriend;
    ; 
    const [bill, setBill] = useState("");
    const [paidByUser, setPaidByUser] = useState("");
    const paidByFriend = bill-paidByUser;//derived state
    const [whoIsPaying, setWhoIsPaying] = useState("user");
    function handelSubmit(e){
      e.preventDefault();
      if(!bill || !paidByUser ) return  ;
      onSplitBill(
      whoIsPaying==="user" ? paidByFriend :-paidByUser  
      )

    }
    return (
      <form className="form-split-bill"
      onSubmit={handelSubmit}
      >
        <h2>spill the bill with {selectedFriend.name}</h2>
        <label>🕺Bill value</label>
        <input type="number"
          value={bill}
          onChange={(e) => {
            setBill(Number(e.target.value));
              if(paidByUser>bill) setPaidByUser(bill);
                  }
        }
        />
    
        <label>🕺Your expense</label>
        <input type="number"
          onChange={(e) => setPaidByUser(
            (Number(e.target.value)>bill)?bill:Number(e.target.value)
          )
          }
          value={paidByUser}
        />
  
  <label>🕺{selectedFriend.name}'s' expense</label>
  <input disabled type="number"
    value={paidByFriend}
  />
  
  <label>🕺who is paying the bill</label>
        <select value={whoIsPaying}
          onChange={(e) => setWhoIsPaying(e.target.value)}
        >
          <option value="you">you</option>
          <option value="friend">{selectedFriend.name}</option>   
        </select>

        <Button>Split the bill</Button>  
      </form>
  
  
    )
  }

}
function FriendsList({ friends, setFriends, onSelectFriend, selectedFriend }) {
  // 
  return (

    <ul>

      {friends.map((friend) => <Friend friend={friend} key={friend.id} onSelectFriend={onSelectFriend} selectedFriend={selectedFriend} />)}
    </ul>
  )
}

function Friend({ friend, onSelectFriend, selectedFriend }) {
  const isSelected = friend.id === selectedFriend?.id;

  // console.log( friend);
  return (

    <li className={isSelected ? 'selected' : ''}>
      <img src={friend.image} />
      <h3>{friend.name}
      </h3>
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
      <Button onClick={() =>
        onSelectFriend(friend)
      }>{(isSelected) ? "close" : "select"}</Button>

    </li>
  )
}


function FormAddFriend({ onAddFriend }) {

  const [newFriendsName, setNewFriendsName] = useState("");
  const [newFriendsImageUrl, setNewImageUrl] = useState("https://i.pravatar.cc/150?img=3");
  function handelSubmit(e) {
    e.preventDefault();
    if (!newFriendsName) return;
    const newFriend = {
      id: Date.now(),
      name: newFriendsName,
      image: newFriendsImageUrl,
      balance: 0,

    };
    onAddFriend(newFriend);
    setNewFriendsName("")
    // console.log("handedl submit 🔥")
    //add new friend to frinds state
  }
  return (
    <form className="form-add-friend"
      onSubmit={e => handelSubmit(e)}
    >

      <label>🕺Friend name</label>
      <input type="text"
        value={newFriendsName}
                onChange={e => setNewFriendsName(e.target.value)}
      />

      <label>🕺Image URL</label>
      <input type="text"
        value={newFriendsImageUrl}
        onChange={e => setNewFriendsName(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  )
}




function Button({ children, onClick }) {
  // Class name: button
  return (<button className="button" onClick={onClick}>{children}</button>)
}

