import { Link } from "react-router-dom";

export default function AdminDashboard() {
    return (
        <div className="row">
            <div className="col-12 col-md-4 col-sm-6 p-3 ">
                <div className="card">
                    <div className="card-body">
                    <div className="card-title"><h2 className="h5">Categories</h2></div>
                    <div className="card-text d-grid gap-3">
                        <Link className="btn btn-primary btn-block" to="/admin/dashboard/category/list">List all categories</Link>
                    </div>
                    </div>
                </div>
            </div>
           
            <div className="col-12 col-md-4 p-3 col-sm-6 ">
            <div className="card">
                    <div className="card-body">
                    <div className="card-title"><h2 className="h5">Admins</h2></div>
                    <div className="card-text d-grid gap-3">
                       <Link className="btn btn-primary btn-block" to="/admin/dashboard/administrator/list">List all admins</Link>
                       <Link className="btn btn-primary btn-block" to="/admin/dashboard/administrator/add">Add a new admin</Link>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}