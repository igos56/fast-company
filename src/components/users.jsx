import React, { useState } from "react";

import API from "../api";

const Users = () => {
    const [users, setUsers] = useState(API.users.fetchAll());

    const handleDelete = userId => {
        setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
    };

    const renderPhrase = number => {
        const exсeptions = [2, 3, 4];
        let typeOfPhrase = 'человек';

        if (exсeptions.includes(number % 20)) {
            typeOfPhrase = 'человека';
        }

        return `${number} ${typeOfPhrase} тусанет с тобой сегодня`;
    };

    const renderQualities = (user) => {
        const result = user.qualities.map(quality => {
            const qualityStyles = 'me-2 mb-2 p-2 badge bg-' + quality.color;

            return (
                <span key={quality._id} className={qualityStyles}>{quality.name}</span>
            );
        });

        return result;
    };

    const getFormatRate = user => {
        let styles = 'w-100 badge p-2 ';
        const { rate } = user;

        if (rate <= 2.5) {
            styles += 'bg-danger';
        } else if (rate > 2.5 && rate <= 3.5) {
            styles += 'bg-warning';
        } else if (rate > 3.5) {
            styles += 'bg-success';
        }

        return (
            <span  className={styles}>{user.rate}</span>
        );
    };

    if (users.length === 0) {
        return <h1><span className="badge bg-danger">Никто с тобой не тусанет ...</span></h1>
    }

    return(
        <>
            <h1><span className="badge bg-primary">{renderPhrase(users.length)}</span></h1>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Имя</th>
                        <th scope="col">Качества</th>
                        <th scope="col">Профессия</th>
                        <th scope="col">Встретился, раз</th>
                        <th scope="col" colSpan={2}>Оценка</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => {
                        return (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{renderQualities(user)}</td>
                                <td>{user.profession.name}</td>
                                <td>{user.completedMeetings}</td>
                                <td>{getFormatRate(user)}</td>
                                <td><button className="btn btn-outline-danger" onClick={() => handleDelete(user._id)}>delete</button></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
};

export default Users;