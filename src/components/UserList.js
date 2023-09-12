import React from 'react';

function UserList({users, onRemove, onToggle}) {
    return (
        <div>
            {users.map(user => (
                <div>
                    <span style={{color:user.active ? 'blue' : 'black'}} 
                    onClick={() => onToggle(user.id)}>
                        이름 : {user.username}
                        이메일 : {user.email}
                    </span>
                    <button onClick={()=>onRemove(user.id)}>삭제</button>
                </div>
            ))}
        </div>
    );
};
export default UserList;