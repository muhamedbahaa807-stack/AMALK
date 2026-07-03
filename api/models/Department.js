import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
        name:String,
        doctorName:String,
        description:String,
        image:String,
        createdAt: {
            type: Date,
            default: Date.now
        }        
})

const Department = mongoose.model("Departments", departmentSchema);
export default Department;