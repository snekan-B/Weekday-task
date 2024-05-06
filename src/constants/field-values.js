/**
 * Constant field values for check box filter.
 */



export const fieldValues =[
    {
        title:"Roles",
        options :[
            {group: "Engineering",name: "backend"},
            {group: "Engineering",name: "frontend"},
            {group: "Engineering",name: "data science"},
            {group: "Engineering",name: "dataengineering"},
            {group: "Engineering",name: "dev-ops"},
            {group: "Engineering",name: "iOS"},
            {group: "Engineering",name: "reactnative"},
            {group: "Engineering",name: "android"},
            {group: "Engineering",name: "tech lead"},
            {group: "Engineering",name: "test / qa"},
            {group: "Engineering",name: "blockchain"},
            {group: "Marketing", name: "Product Marketing Manager"},
            {group: "Marketing",name: "Growth Hacker"},
            {group: "Operations",name: "Founder’s Office/Chief Of Staff"},
            {group: "Operations",name: "Operations Manager"},
            {group: "Sales",name: "Account Manager"},
            {group: "Sales",name: "Account Executive"},
            {group: "Sales",name: "Sales Development Representative"},
            {group: "Product",name: "Product Manager"},
            {group: "Design",name: "Design Manager"},
            {group: "Design",name: "Product Designer"},
            {group: "Design",name: "Graphic Designer"}
    
        ],
        filterKey:"jobRole",
        isMultiple:true,
        groupBy:true
    },
    {
        title :"Experience",
        filterKey :"minExp",
        isMultiple:true,
        options:["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
    },
    {
        title:"Remote",
        filterKey:"location",
        isMultiple:true,
        options:["Remote", "Hybrid", "In-office"]
    },
    {
        title: "Minimum Base Pay Salary",
        filterKey:"minJdSalary",
        isMultiple:false,
        options: ["0L", "10L", "20L", "30L", "40L", "50L", "60L", "70L"]
    }
]

