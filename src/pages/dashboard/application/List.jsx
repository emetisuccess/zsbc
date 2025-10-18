import React from 'react'

const List = () => {
    const users = [
        { id: 1, name: 'Alice', email: 'alice@example.com' },
        { id: 2, name: 'Bob', email: 'bob@example.com' },
        { id: 3, name: 'Celia', email: 'celia@example.com' },
    ];

    return (
        <div>
            <h3 className="text-lg font-semibold mb-4">Users</h3>
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4">
                <table className="w-full text-left">
                    <thead>
                        <tr className="text-sm text-gray-500">
                            <th className="pb-2">ID</th>
                            <th className="pb-2">Name</th>
                            <th className="pb-2">Email</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {users.map((u) => (
                            <tr key={u.id} className="odd:bg-gray-50 dark:odd:bg-gray-800">
                                <td className="py-2 text-sm text-gray-600 dark:text-gray-300">{u.id}</td>
                                <td className="py-2">{u.name}</td>
                                <td className="py-2 text-sm text-gray-600 dark:text-gray-300">{u.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default List