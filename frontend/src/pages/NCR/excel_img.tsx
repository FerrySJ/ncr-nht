import React from 'react';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from '../../components/common/PageMeta';
import ComponentCard from '../../components/common/ComponentCard';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

import Badge from "../../components/ui/badge/Badge";
// import Badge from "../../../";

interface Order {
  id: number;
  user: {
    image: string;
    name: string;
    role: string;
  };
  projectName: string;
  team: {
    images: string[];
  };
  status: string;
  budget: string;
}

// Define the table data using the interface
const tableData: Order[] = [
  {
    id: 1,
    user: {
      image: "/images/user/user-17.jpg",
      name: "Lindsey Curtis",
      role: "Web Designer",
    },
    projectName: "Agency Website",
    team: {
      images: [
        "/images/user/user-22.jpg",
        "/images/user/user-23.jpg",
        "/images/user/user-24.jpg",
      ],
    },
    budget: "3.9K",
    status: "Active",
  },
  {
    id: 2,
    user: {
      image: "/images/user/user-18.jpg",
      name: "Kaiya George",
      role: "Project Manager",
    },
    projectName: "Technology",
    team: {
      images: ["/images/user/user-25.jpg", "/images/user/user-26.jpg"],
    },
    budget: "24.9K",
    status: "Pending",
  },
  {
    id: 3,
    user: {
      image: "/images/user/user-17.jpg",
      name: "Zain Geidt",
      role: "Content Writing",
    },
    projectName: "Blog Writing",
    team: {
      images: ["/images/user/user-27.jpg"],
    },
    budget: "12.7K",
    status: "Active",
  },
  {
    id: 4,
    user: {
      image: "/images/user/user-20.jpg",
      name: "Abram Schleifer",
      role: "Digital Marketer",
    },
    projectName: "Social Media",
    team: {
      images: [
        "/images/user/user-28.jpg",
        "/images/user/user-29.jpg",
        "/images/user/user-30.jpg",
      ],
    },
    budget: "2.8K",
    status: "Cancel",
  },
  {
    id: 5,
    user: {
      image: "/images/user/user-21.jpg",
      name: "Carla George",
      role: "Front-end Developer",
    },
    projectName: "Website",
    team: {
      images: [
        "/images/user/user-31.jpg",
        "/images/user/user-32.jpg",
        "/images/user/user-33.jpg",
      ],
    },
    budget: "4.5K",
    status: "Active",
  },
];


const Excel_image = () => {
  const exportExcel = async () => {
    
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Projects");
  
    // Header
    worksheet.addRow(["User Image", "Name", "Role", "Project", "Status", "Budget"]);
  
    // ตัวอย่างข้อมูล

    try {
      
        for (let i = 0; i < tableData.length; i++) {
          const order = tableData[i];
      
          // Load image as buffer
          const response = await fetch(order.user.image);
          const blob = await response.blob();
          const arrayBuffer = await blob.arrayBuffer();
      
          const imageId = workbook.addImage({
            buffer: arrayBuffer,
            extension: "png",
          });
      
          const rowIndex = i + 2; // Row 1 = header
          worksheet.addRow(["", order.user.name, order.user.role, order.projectName, order.status, order.budget]);
      
          worksheet.addImage(imageId, {
            tl: { col: 0, row: rowIndex - 1 },
            ext: { width: 40, height: 40 },
          });
      
          worksheet.getRow(rowIndex).height = 40; // Adjust row height
        }
      
        // Column width
        worksheet.columns = [
          { width: 12 },
          { width: 20 },
          { width: 20 },
          { width: 20 },
          { width: 12 },
          { width: 10 },
        ];
      
        const buffer = await workbook.xlsx.writeBuffer();
        const blobExcel = new Blob([buffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
      
        saveAs(blobExcel, "project_with_images.xlsx");
      
    } catch (error) {
      console.error('Error exporting Excel:', error);
    }
  };

  return (
    <>
      <PageMeta
        title="React.js Ecommerce Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Export Excel" />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7"><h3>Export Excel with Image</h3>
        
        <ComponentCard title="Basic Table 1">
        
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                User
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Project Name
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Status
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Budget
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {tableData.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 overflow-hidden rounded-full">
                      <img
                        width={40}
                        height={40}
                        src={order.user.image}
                        alt={order.user.name}
                      />
                    </div>
                    <div>
                      <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {order.user.name}
                      </span>
                      <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                        {order.user.role}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {order.projectName}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={
                      order.status === "Active"
                        ? "success"
                        : order.status === "Pending"
                        ? "warning"
                        : "error"
                    }
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {order.budget}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>

        </ComponentCard>
        <button onClick={exportExcel}>📥 Export to Excel</button></div>
    <div style={{ padding: '20px' }}>
      
    </div>
    
    </div>
    
    </>
  );
};

export default Excel_image;
