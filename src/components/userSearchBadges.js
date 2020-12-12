import React, { useState } from 'react';

function UserSearchBadges(badges) {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('');
  const [filteredBadges, setFilteredBadges] = useState(badges);

  //useMemo es para memorizar los resultados del query
  React.useMemo(() => {
    const result = badges.filter((badge) => {
      let isType = true;

      //el status de la carta
      console.log(type);
      if (type.length > 0 && type !== 'All') {
        //isType = `${badge.type}`.includes(type);
        isType = badge.type === type;
      }

      //si el nombre es igual a la busqueda
      const isQuery = `${badge.cardName}`
        .toLowerCase()
        .includes(query.toLowerCase());

      return (isQuery && isType); //checan que los 2 sean true
    });

    setFilteredBadges(result);
  }, [badges, query + type]);

  return { query, setQuery, type, setType, filteredBadges };
}

export default UserSearchBadges;
