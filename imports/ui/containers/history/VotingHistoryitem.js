import React  from 'react';


const VotingHistoryItem = ({ item }) => {
  return (
    <div>
      { item.title } on { item.createdAt.getDay() }/{ item.createdAt.getMonth() }/{ item.createdAt.getYear() }
    </div>
  );
}

export default VotingHistoryItem;
