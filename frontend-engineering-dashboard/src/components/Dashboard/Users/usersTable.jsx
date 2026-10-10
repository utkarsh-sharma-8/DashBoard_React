import { useMemo, useState } from "react";
import { mockUsers } from "../../../services/mockUsers";

const PAGE_SIZE = 5;
const UsersTable = () => {

    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("All");

    const filteredUsers = useMemo(() => {
        const query = search.trim().toLowerCase();
        return mockUsers.filter((user) => {
            const matchesSearch = user.name.toLowerCase().includes(query) || user.email.toLowerCase.includes(query);
            const matchesStatus = status == "All" || user.status == status;

            return matchesSearch || matchesStatus
        });
    }, [search, status]);

    const totalPages = Math.ceil(filteredUsers.length / PAGE_SIZE);
    const currentPage = Math.min(page, Math.max(totalPages, 1));

    const visibleUsers = filteredUsers.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE
    );

    const updateSearch = (value) => {
        setSearch(value);
        setPage(1);
    };

    const updateStatus = (value) => {
        setStatus(value);
        setPage(1);
    };
    return (
        <section className="rounded-xl border border-slate-200 bg-white">
            <div className="flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center">
                <div>
                    <h2 className="text-xl font-bold text-slate-900">Users</h2>
                    <p className="text-sm text-slate-500">
                        Manage and view all users in your platform
                    </p>
                </div>
                <div className="flex flex-wrap gap-3">
                    <input
                        value={search}
                        onChange={(event) => updateSearch(event.target.value)}
                        placeholder="Search users by name, email..."
                        className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500"
                    />

                    <select
                        value={status}
                        onChange={(event) => updateStatus(event.target.value)}
                        className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                    >
                        <option value="All">All Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>

                    <button
                        type="button"
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white"
                        onClick={() => alert("Add User form coming next")}
                    >
                        + Add User
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full min-w-[950px] text-left text-sm">
                    <thead className="bg-slate-50 text-slate-700">
                        <tr>
                            <th className="px-4 py-3">#</th>
                            <th className="px-4 py-3">User</th>
                            <th className="px-4 py-3">Email</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Role</th>
                            <th className="px-4 py-3">Revenue</th>
                            <th className="px-4 py-3">Joined At</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                        {visibleUsers.map((user) => (
                            <tr key={user.id} className="hover:bg-slate-50">
                                <td className="px-4 py-3">{user.id}</td>
                                <td className="px-4 py-3 font-medium">{user.name}</td>
                                <td className="px-4 py-3">{user.email}</td>
                                <td className="px-4 py-3">
                                    <span
                                        className={`rounded-md px-2 py-1 text-xs ${user.status === "Active"
                                                ? "bg-emerald-100 text-emerald-700"
                                                : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {user.status}
                                    </span>
                                </td>
                                <td className="px-4 py-3">{user.role}</td>
                                <td className="px-4 py-3">
                                    ₹{user.revenue.toLocaleString("en-IN")}
                                </td>
                                <td className="px-4 py-3">
                                    {new Date(`${user.joinedAt}T00:00:00`).toLocaleDateString(
                                        "en-US",
                                        { month: "short", day: "numeric", year: "numeric" }
                                    )}
                                </td>
                            </tr>
                        ))}

                        {visibleUsers.length === 0 && (
                            <tr>
                                <td colSpan={7} className="px-4 py-8 text-center text-slate-500">
                                    No users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-col justify-between gap-3 border-t border-slate-100 p-4 sm:flex-row sm:items-center">
                <p className="text-sm text-slate-600">
                    Showing{" "}
                    {filteredUsers.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1}
                    {" "}to{" "}
                    {Math.min(currentPage * PAGE_SIZE, filteredUsers.length)}
                    {" "}of {filteredUsers.length.toLocaleString()} users
                </p>

                <div className="flex items-center gap-2">
                    <button
                        disabled={currentPage <= 1}
                        onClick={() => setPage((p) => p - 1)}
                        className="rounded-md border px-3 py-2 disabled:opacity-40"
                    >
                        Previous
                    </button>

                    <span className="text-sm">
                        Page {currentPage} of {Math.max(totalPages, 1)}
                    </span>

                    <button
                        disabled={currentPage >= totalPages}
                        onClick={() => setPage((p) => p + 1)}
                        className="rounded-md border px-3 py-2 disabled:opacity-40"
                    >
                        Next
                    </button>
                </div>
            </div>
        </section>
    )
}

export default UsersTable;