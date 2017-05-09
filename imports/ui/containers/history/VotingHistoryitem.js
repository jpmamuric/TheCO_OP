import React  from 'react';


const VotingHistoryItem = ({ item }) => {
  return (
    <div>
      { item.title } on { item.createdAt.getMonth() }/{ item.createdAt.getDate()}/{ item.createdAt.getFullYear() }
    </div>
  );
}

export default VotingHistoryItem;
