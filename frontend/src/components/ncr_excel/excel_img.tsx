import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

const exportToExcelWithImage = async () => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('My Sheet');

  // Header
  worksheet.addRow(['Name 1', 'Name 2', 'Image']);

  // ตัวอย่างข้อมูล
  const imageUrl = 'https://via.placeholder.com/50'; // เปลี่ยนเป็นลิงก์จริงของคุณ
  const response = await fetch(imageUrl);
  const blob = await response.blob();
  const arrayBuffer = await blob.arrayBuffer();

  const imageId = workbook.addImage({
    buffer: arrayBuffer,
    extension: 'png', // หรือ jpg ตามจริง
  });

  worksheet.addRow(['Emil', 'Tobias', '']); // สร้าง row ก่อนใส่รูป

  worksheet.addImage(imageId, {
    tl: { col: 2, row: 1 }, // ใส่รูปที่ column 3 (index เริ่ม 0), row 2
    ext: { width: 50, height: 50 },
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const blobExcel = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

  saveAs(blobExcel, 'table_with_image.xlsx');
};

export default exportToExcelWithImage;