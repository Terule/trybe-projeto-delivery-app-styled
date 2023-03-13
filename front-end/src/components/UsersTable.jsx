import React, { useCallback, useContext, useEffect, useState } from 'react';
import AppContext from '../context/AppContext';
import { getUsers, deleteUser } from '../utils/fetchApi';

const ROUTE = 'admin_manage';
const ELEMENT = 'element-user-table';

function UsersTable() {
  const [users, setUsers] = useState([]);
  const { user } = useContext(AppContext);

  // useEffect(() => {
  //   const fetchApiData = async () => {
  //     const result = await getUsers();

  //     return setUsers(result);
  //   };
  //   fetchApiData();
  //   console.log(fetchApiData());
  //   console.log(users);
  // }, []);

  const removeUser = useCallback(async (id) => {
    const { token } = user;
    await deleteUser(token, id);
  });

  useEffect(() => {
    const fetchUsers = async () => {
      const result = await getUsers();
      setUsers(result);
    };
    fetchUsers();
  }, [removeUser]);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Tipo</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {users.map((element, index) => (
            <tr key={ element.name }>
              <td data-testid={ `${ROUTE}__${ELEMENT}-item-number-${index}` }>
                { index + 1 }
              </td>
              <td data-testid={ `${ROUTE}__${ELEMENT}-name-${index}` }>
                { element.name }
              </td>
              <td data-testid={ `${ROUTE}__${ELEMENT}-email-${index}` }>
                { element.email }
              </td>
              <td data-testid={ `${ROUTE}__${ELEMENT}-role-${index}` }>
                { element.role }
              </td>
              <td>
                <button
                  type="button"
                  data-testid={ `${ROUTE}__${ELEMENT}-remove-${index}` }
                  onClick={ () => removeUser(element.id) }
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersTable;