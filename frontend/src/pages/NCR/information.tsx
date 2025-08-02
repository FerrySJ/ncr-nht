import React, { useState, useEffect } from "react";
import {
  Input,
  Button,
  DatePicker,
  Upload,
  Table,
  Typography,
  Modal,
  Collapse,
  Select,
  CheckboxChangeEvent,
  RadioChangeEvent,
} from "antd";
// import Button from 'antd-button-color';
import moment from "moment";
import Label from "../../components/form/Label";
import FileUpload from "../../components/ncr/upload_file/fileUpload";
import Radio from "../../components/form/input/Radio";
import { httpClient } from "../../utils/HttpClient";
import { server } from "../../constance/contance";
import type { UploadChangeParam } from "antd/es/upload";
import { ColumnType } from "antd/es/table";
import ComponentCard from "../../components/common/ComponentCard";

const { TextArea } = Input;
const { Panel } = Collapse;

interface RowData {
  key: string | number;
  reply: string;
  deny: string;
  detail: string;
  date: string | null;
  by: string;
  personNo: string;
  time?: string;
}
interface DataPart6 {
  key: string;
  reply: string;
  deny: string;
  detail: string;
  date: string;
  by: string;
  personNo: string;
  file: any; // หรือกำหนดเป็น File หรือ FileList ก็ได้
}
interface DataType {
  key: string;
  time: string;
  detail: string;
  date: string;
  by: string;
}

type MasterType = {
  catagories: string;
  process: string;
  part: string;
};

const data = [
  { id: 3, label: "คนที่ 3" },
  { id: 4, label: "คนที่ 4" },
  { id: 5, label: "คนที่ 5" },
  { id: 6, label: "คนที่ 6" },
  { id: 7, label: "คนที่ 7" },
  { id: 8, label: "คนที่ 8" },
  { id: 9, label: "คนที่ 9" },
  { id: 10, label: "คนที่ 10" },
  { id: 11, label: "คนที่ 11" },
];

const rows = [{ type: "COMMENT" }, { type: "REPLY" }];
export default function NCRForm() {
  const [ngCatagory, setNgCatagory] = useState<MasterType[]>([]);
  const [mProcess, setMProcess] = useState<MasterType[]>([]);
  const [mPart, setMPart] = useState<MasterType[]>([]);
  const [activeKey, setActiveKey] = useState(["1"]); // เปิด Panel แรกตอนเริ่ม
  const [selectedValue, setSelectedValue] = useState<string>("no");

  const [dataSource, setDataSource] = useState([
    {
      key: 0,
      detail: "",
      date: null,
      by: "",
      personNo: "",
    },
  ]);

  const [dataSourceFW, setDataSourceFW] = useState<DataType[]>([
    { key: "1", time: "1ST", detail: "", date: "", by: "" },
    { key: "2", time: "2ND", detail: "", date: "", by: "" },
    { key: "3", time: "3RD", detail: "", date: "", by: "" },
  ]);

  const [dataSource_part6, setDataSource_part6] = useState<DataPart6[]>([
    { key: "1", deny: "", detail: "", date: "", by: "", file: null },
    { key: "2", deny: "", detail: "", date: "", by: "", file: null },
  ]);

  const columns_part6: ColumnType<DataPart6>[] = [
    { title: "DENY", dataIndex: "deny" },
    { title: "DETAIL", dataIndex: "detail" },
    { title: "DATE", dataIndex: "date" },
    { title: "BY", dataIndex: "by" },
    {
      title: "ATTACHED FILE",
      dataIndex: "file",
      key: "file",
      render: (_: any, record: DataPart6) => (
        <Upload
          beforeUpload={() => false}
          onChange={(info) => handleFileChange(info, record.key)}
        >
          <FileUpload
            label=""
            accept="image/*,.pdf,.xlsx,.xls"
            onFileChange={(file: File) => console.log(file)}
          />
        </Upload>
      ),
    },
  ];

  const handleFileChange = (info: UploadChangeParam, key: string) => {
    const newData = [...dataSource_part6];
    const index = newData.findIndex((item) => item.key === key);
    if (index > -1) {
      newData[index].file = info.fileList;
      setDataSource_part6(newData);
    }
  };

  // const handleSave = (row) => {
  //   const newData = [...dataSource];
  //   const index = newData.findIndex((item) => row.key === item.key);
  //   if (index > -1) {
  //     newData[index] = { ...newData[index], ...row };
  //     setDataSource_part6(newData);
  //   }
  // };

  // const mergedColumns = columns_part6.map((col) => ({
  //   ...col,
  //   onCell: (record) => ({
  //     record,
  //     editable: col.editable,
  //     title: col.title,
  //     handleSave,
  //   }),
  // }));

  const handleRadioChange = (value: string) => {
    // const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(value);
  };

  const handleChange = (
    key: string | number,
    field: keyof RowData,
    value: string | null
  ) => {
    setDataSource((prev) =>
      prev.map((item) =>
        item.key === key ? { ...item, [field]: value } : item
      )
    );
  };

  const columns_deny = [
    {
      title: "NO.",
      dataIndex: "key",
      key: "key",
      width: 50,
      render: (_: any, record: RowData, index: number) => index + 1,
    },
    {
      title: "DETAIL",
      dataIndex: "detail",
      key: "detail",
      render: (_: any, record: RowData) => (
        <Input
          value={record.detail}
          onChange={(e) => handleChange(record.key, "detail", e.target.value)}
          placeholder="Detail"
        />
      ),
    },
    {
      title: "DATE",
      dataIndex: "date",
      key: "date",
      render: (_: any, record: RowData) => (
        <DatePicker
          value={record.date ? moment(record.date) : null}
          onChange={(
            date: moment.Moment | null,
            dateString: string | string[]
          ) =>
            handleChange(
              record.key,
              "date",
              Array.isArray(dateString) ? dateString[0] : dateString || null
            )
          }
          style={{ width: "100%" }}
          format="YYYY-MM-DD"
          disabled
        />
      ),
    },
    {
      title: "BY",
      dataIndex: "by",
      key: "by",
      render: (_: any, record: RowData) => (
        <Input
          value={record.by}
          onChange={(e) => handleChange(record.key, "by", e.target.value)}
          placeholder="By"
        />
      ),
    },
    {
      title: "PERSON NO.",
      dataIndex: "personNo",
      key: "personNo",
      render: (_: any, record: RowData) => (
        <Input
          value={record.personNo}
          onChange={(e) => handleChange(record.key, "personNo", e.target.value)}
          disabled
          placeholder="Person No."
        />
      ),
    },
    {
      title: "APPROVED",
      dataIndex: "deny",
      key: "deny",
      render: (_: any, record: RowData) => (
        <Button type="primary" danger>
          DENY
        </Button>
      ),
    },
  ];

  const columns_reply = [
    {
      title: "NO.",
      dataIndex: "key",
      key: "key",
      width: 50,
      render: (_: any, record: RowData, index: number) => index + 1,
    },
    {
      title: "DETAIL",
      dataIndex: "detail",
      key: "detail",
      render: (_: any, record: RowData) => (
        <Input
          value={record.detail}
          onChange={(e) => handleChange(record.key, "detail", e.target.value)}
          placeholder="Detail"
        />
      ),
    },
    {
      title: "DATE",
      dataIndex: "date",
      key: "date",
      render: (_: any, record: RowData) => (
        <DatePicker
          value={record.date ? moment(record.date) : null}
          onChange={(date, dateString) =>
            handleChange(
              record.key,
              "date",
              Array.isArray(dateString) ? dateString[0] : dateString || null
            )
          }
          style={{ width: "100%" }}
          format="YYYY-MM-DD"
        />
      ),
    },
    {
      title: "BY",
      dataIndex: "by",
      key: "by",
      render: (_: any, record: RowData) => (
        <Input
          value={record.by}
          onChange={(e) => handleChange(record.key, "by", e.target.value)}
          placeholder="By"
        />
      ),
    },
    {
      title: "PERSON NO.",
      dataIndex: "personNo",
      key: "personNo",
      render: (_: any, record: RowData) => (
        <Input
          value={record.personNo}
          onChange={(e) => handleChange(record.key, "personNo", e.target.value)}
          disabled
          placeholder="Person No."
        />
      ),
    },
    {
      title: "APPROVED",
      dataIndex: "deny",
      key: "deny",
      render: (_: any, record: RowData) => (
        <Button style={{ backgroundColor: "#83ee8b", color: "#000" }}>
          REPLY
        </Button>
      ),
    },
  ];

  const columns_deny_part6 = [
    {
      title: "DENY",
      dataIndex: "deny",
      key: "deny",
      width: 50,
      render: (_: any, record: RowData) => `COMMENT`,
    },
    {
      title: "DETAIL",
      dataIndex: "detail",
      key: "detail",
      render: (_: any, record: RowData) => (
        <Input
          value={record.detail}
          onChange={(e) => handleChange(record.key, "detail", e.target.value)}
          placeholder="Detail"
        />
      ),
    },
    {
      title: "DATE",
      dataIndex: "date",
      key: "date",
      render: (_: any, record: RowData) => (
        <DatePicker
          value={record.date ? moment(record.date) : null}
          onChange={(
            date: moment.Moment | null,
            dateString: string | string[]
          ) =>
            handleChange(
              record.key,
              "date",
              Array.isArray(dateString) ? dateString[0] : dateString || null
            )
          }
          style={{ width: "100%" }}
          format="YYYY-MM-DD"
          disabled
        />
      ),
    },
    {
      title: "BY",
      dataIndex: "by",
      key: "by",
      render: (_: any, record: RowData) => (
        <Input
          value={record.by}
          onChange={(e) => handleChange(record.key, "by", e.target.value)}
          placeholder="By"
        />
      ),
    },
    {
      title: "ATTACHED FILE",
      dataIndex: "file",
      key: "file",
      render: (_: any, record: RowData) => (
        <FileUpload
          label="" //"แนบไฟล์ (Image / PDF / Excel)"
          accept="image/*,.pdf,.xlsx,.xls"
          onFileChange={(file: File) => console.log(file)}
        />
      ),
    },
  ];
  // ฟังก์ชันสำหรับแก้ไขค่าใน input
  const handleChange_fw = (
    key: string,
    field: keyof DataType,
    value: string
  ) => {
    setDataSourceFW((prev) =>
      prev.map((item) =>
        item.key === key ? { ...item, [field]: value } : item
      )
    );
  };

  const columns_fw = [
    {
      title: "TIME",
      dataIndex: "time",
      key: "time",
      width: 80,
    },
    {
      title: "DETAIL",
      dataIndex: "detail",
      key: "detail",
      render: (_: any, record: DataType) => (
        <Input
          value={record.detail}
          onChange={(e) =>
            handleChange_fw(record.key, "detail", e.target.value)
          }
          placeholder="Detail"
        />
      ),
    },
    {
      title: "DATE",
      dataIndex: "date",
      key: "date",
      render: (_: any, record: DataType) => (
        <Input
          value={record.date}
          onChange={(e) => handleChange_fw(record.key, "date", e.target.value)}
          placeholder="Date"
        />
      ),
    },
    {
      title: "BY",
      dataIndex: "by",
      key: "by",
      render: (_: any, record: DataType) => (
        <Input
          value={record.by}
          onChange={(e) => handleChange_fw(record.key, "by", e.target.value)}
          placeholder="By"
        />
      ),
    },
    {
      title: "CLICK",
      key: "action",
      width: 100,
      render: (_: any, record: DataType) => (
        <div className="flex gap-2">
          <Button
            onClick={() => console.log(`Clicked OK on row ${record.time}`)}
          >
            OK
          </Button>
          <Button
            onClick={() => console.log(`Clicked NG on row ${record.time}`)}
            danger
          >
            NG
          </Button>
        </div>
      ),
    },
  ];

  const get_master_cat = async () => {
    try {
      let catagiries = await httpClient.get(server.MASTER_NG_CATAGORIES);
      if (catagiries.data.result.length > 0) {
        setNgCatagory(catagiries.data.result);
      }
    } catch (error) {
      console.error("Fetch master cat  ", error);
    }
  };

  const get_master_process = async () => {
    try {
      let process = await httpClient.get(server.MASTER_PROCESS);
      // console.log("process", process.data);
      if (process.data.result.length > 0) {
        setMProcess(process.data.result);
      }
    } catch (error) {
      console.error("get_master_process ... ", error);
    }
  };

  const get_master_part = async () => {
    try {
      let part = await httpClient.get(server.MASTER_PARTS);
      if (part.data.length > 0) {
        setMPart(part.data.result);
      }
    } catch (error) {}
  };
  useEffect(() => {
    get_master_cat();
    get_master_process();
    get_master_part();
  }, []);

  return (
    <div className="space-y-4">
      <ComponentCard title="PART 1: NCR INFORMATION">
        {/* <Title level={4}>PART 1: NCR INFORMATION</Title> */}
        <div className="flex gap-2">
          <div className="w-full">
            <Label htmlFor="input">NCR NO.</Label>
            <Input type="text" id="ncr_no" />
          </div>
          <div className="w-full">
            <Label htmlFor="input">PART NO.</Label>
            <Input type="text" id="part_no" />
          </div>
          <div className="w-full">
            <Label htmlFor="input">NG CASE</Label>
            <Input type="text" id="ng_case" />
          </div>
          <div className="w-full">
            <Label htmlFor="input">SEQUENCE</Label>
            <Input type="text" id="sequence" />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="w-full">
            <Label htmlFor="input">NG CATAGORIES</Label>
            <Select
              className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30  bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700  dark:focus:border-brand-800"
              id="ng_cat"
              placeholder="-Please select NG Catagories-"
              options={ngCatagory.map((item) => ({
                value: item.catagories,
                label: item.catagories,
              }))}
            />
          </div>
          <div className="w-full">
            <Label htmlFor="input">HUMAN ERROR</Label>
            <Select
              className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30  bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700  dark:focus:border-brand-800"
              id="ng_cat"
              placeholder="-Please select Human Error-"
              options={[
                {
                  value: "YES",
                  label: "YES",
                },
                {
                  value: "NO",
                  label: "NO",
                },
              ]}
            />
          </div>
          <div className="w-full">
            <Label htmlFor="input">NG Q'TY</Label>
            <Input type="text" id="ng_qty" />
          </div>
          <div className="w-full">
            <Label htmlFor="input">LOT NO.</Label>
            <Input type="text" id="lot_no" />
          </div>
          <div className="w-full">
            <Label htmlFor="input">FROM</Label>
            <Select
              className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30  bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700  dark:focus:border-brand-800"
              id="from"
              placeholder="-Please select From-"
              options={mProcess.map((item) => ({
                value: item.process,
                label: item.process,
              }))}
            />
          </div>
        </div>
        <div className="mt-4 p-4 border border-gray-300 rounded-md bg-gray-50 shadow-sm">
          <h4 className="text-sm font-semibold mb-2 text-gray-700">
            MACHINE NO.
          </h4>
          <div className="flex flex-wrap gap-4">
            <div className="w-full md:w-1/3">
              <Label>ASSEMBLY</Label>
              <Input type="text" id="assembly" className="w-full" />
            </div>
            <div className="w-full md:w-1/3">
              <Label>MACHINE SHOP</Label>
              <Input type="text" id="mc_shop" className="w-full" />
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="w-full">
            <Label htmlFor="input">ISSUE BY</Label>
            <Input type="text" id="issue_by" />
          </div>
          <div className="w-full">
            <Label htmlFor="input">ISSUE DATE</Label>
            <DatePicker
              style={{ width: "100%" }}
              id="issue_date"
              value={moment()}
              disabled
            />
          </div>
          <div className="w-full">
            <Label htmlFor="input">ISSUE DUE</Label>
            <DatePicker
              style={{ width: "100%" }}
              id="issue_due"
              value={moment().add(3, "days")}
              disabled
            />
          </div>
        </div>

        <div className="flex gap-2  items-center">
          <div className="w-full">
            <Label>PART</Label>
            <Input type="text" id="part" placeholder="dropdown"></Input>
          </div>
          <div className="w-full">
            <Label>PROCESS</Label>
            <Input type="text" id="process" placeholder="dropdown"></Input>
          </div>
          <div className="w-full">
            <Label>SUB-PROCESS</Label>
            <Input type="text" id="sub_process" placeholder="dropdown"></Input>
          </div>
        </div>
      </ComponentCard>

      <ComponentCard title="PART 2: PROCESS FLOW">
        <div className="flex gap-2 items-center">
          <div className="w-full">
            <Label>PERSON IN CHRAGE</Label>
            <Input
              type="text"
              placeholder="name from sheet master"
              id="person_in_chrage"
              disabled
            ></Input>
          </div>
        </div>
      </ComponentCard>

      <ComponentCard title="PART 3: INFORMATION">
        <div className="flex gap-2">
          <div className="w-full">
            <Label htmlFor="input">PROBLEM (ปัญหาที่พบ)</Label>
            <TextArea id="problem" />
          </div>
          <div className="w-full">
            <Label htmlFor="input">ATTACHED FILE/ PICTURE</Label>
            <FileUpload
              label="" //"แนบไฟล์ (Image / PDF / Excel)"
              accept="image/*,.pdf,.xlsx,.xls"
              onFileChange={(file: File) => console.log(file)}
            />
            {/* <FileInput className="custom-class" /> */}
          </div>
        </div>
        <div className="flex gap-2">
          <div className="w-full">
            <Label>INVENTORY DISPOSITION ( การจัดการงานที่มีปัญหา )</Label>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="w-full">
            <Label>PROCESS</Label>
            <Input type="text" id="process_bf"></Input>
          </div>
          <div className="w-full">
            <Label>WIP</Label>
            <Input type="text" id="wip"></Input>
          </div>
          <div className="w-full">
            <Label>DISPATCH / WAREHOUSE</Label>
            <Input type="text" id="dispatch"></Input>
          </div>
          <div className="w-full">
            <Label>CUSTOMER</Label>
            <Input type="text" id="customer"></Input>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="mt-2">
            <Label>ATTACHED FILE</Label>
            <FileUpload
              label=""
              accept="image/*,.pdf,.xlsx,.xls"
              onFileChange={(file: File) => console.log(file)}
            />
          </div>
        </div>
        <div className="flex justify-center m-2">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </div>
      </ComponentCard>
      <ComponentCard title="PART 4: INFORMATION">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <div className="space-y-6">
            <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex-1">
                  <div className="w-full">
                    <Label>ROOT CAUSE (สาเหตุของการเกิด NG)</Label>
                    <TextArea id="root_cause"></TextArea>
                  </div>
                  <div className="flex flex-col-2 gap-2">
                    <div className="w-full">
                      <Label htmlFor="input">5M1E</Label>
                      <Select
                        className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30  bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700  dark:focus:border-brand-800"
                        id="ng_cat"
                        placeholder="-Please select NG Catagories-"
                        options={ngCatagory.map((item) => ({
                          value: item.catagories,
                          label: item.catagories,
                        }))}
                      />
                    </div>
                    <div className="w-full">
                      <Label>EMP NO. (MAN)</Label>
                      <Input id="emp_man"></Input>
                    </div>
                  </div>
                  <div className="w-full">
                    <Label>ATTACHED FILE</Label>
                    <FileUpload
                      label=""
                      accept="image/*,.pdf,.xlsx,.xls"
                      onFileChange={(file: File) => console.log(file)}
                    />
                  </div>
                  <div className="w-full">
                    <Label>
                      CORRECTIVE ACTION (การแก้ไขปัญหาที่ทำให้เกิด NG)
                    </Label>
                    <TextArea id="cor_action"></TextArea>
                  </div>
                  <div className="w-full">
                    {/* <div className="w-full overflow-hidden whitespace-nowrap text-ellipsis"> */}
                    <Label>ATTACHED FILE</Label>
                    <FileUpload
                      label=""
                      accept="image/*,.pdf,.xlsx,.xls"
                      onFileChange={(file: File) => console.log(file)}
                    />
                  </div>
                  <div className="w-full">
                    <Label>ACTION LOT (ล็อตงานหลังจาก Action)</Label>
                    <TextArea id="root_cause"></TextArea>
                  </div>
                  <div className="w-full max-w-[200px]">
                    <Label>ATTACHED FILE</Label>
                    <FileUpload
                      label=""
                      accept="image/*,.pdf,.xlsx,.xls"
                      onFileChange={(file: File) => console.log(file)}
                    />
                  </div>

                  <div className="w-full">
                    <Label>IMPLEMENT ACTION (การขยายผลงาน Action ล็อต)</Label>
                    <TextArea id="cor_action"></TextArea>
                  </div>

                  <div className="w-full">
                    <Label>ATTACHED FILE</Label>
                    <FileUpload
                      label=""
                      accept="image/*,.pdf,.xlsx,.xls"
                      onFileChange={(file: File) => console.log(file)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex-1">
                  <div className="w-full">
                    <Label className="block text-sm font-medium text-gray-700">
                      PROCESS DETECTION (มีการตรวจสอบ 100% หรือไม่)
                    </Label>
                    <div className="flex flex-wrap items-center gap-8">
                      <Radio
                        id="radio1"
                        name="group1"
                        value="yes"
                        checked={selectedValue === "yes"}
                        onChange={handleRadioChange}
                        label="Yes"
                      />
                      <Radio
                        id="radio2"
                        name="group1"
                        value="no"
                        checked={selectedValue === "no"}
                        onChange={handleRadioChange}
                        label="No"
                      />
                    </div>
                    {/* <div className="flex flex-wrap items-center gap-8">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          id="radio1"
                          name="group1"
                          value="yes"
                          checked={selectedValue === "yes"}
                          onChange={handleRadioChange}
                          // className="form-radio"
                        />
                        YES
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          id="radio2"
                          name="group1"
                          value="no"
                          checked={selectedValue === "no"}
                          onChange={handleRadioChange}
                          // className="form-radio"
                        />
                        No
                      </label>
                    </div> */}
                  </div>
                  {selectedValue === "yes" && (
                    <div>
                      <div className="w-full">
                        <Label>FLOW OUT CAUSE (สาเหตุที่ทำให้ Flow out)</Label>
                        <TextArea id="flow_out_cause"></TextArea>
                      </div>
                      <div className="w-full">
                        <Label>ATTACHED FILE</Label>
                        <FileUpload
                          label=""
                          accept="image/*,.pdf,.xlsx,.xls"
                          onFileChange={(file: File) => console.log(file)}
                        />
                      </div>
                      <div className="w-full">
                        <Label>
                          FLOW OUT ACTION (การแก้ไขสาเหตุที่ Flow out)
                        </Label>
                        <TextArea id="cor_action"></TextArea>
                      </div>
                      <div className="w-full">
                        <Label>ATTACHED FILE</Label>
                        <FileUpload
                          label=""
                          accept="image/*,.pdf,.xlsx,.xls"
                          onFileChange={(file: File) => console.log(file)}
                        />
                      </div>
                      <div className="w-full">
                        <Label>
                          FLOW OUT ACTION LOT (ล็อตงานหลังจาก Action)
                        </Label>
                        <TextArea id="flow_out_cause"></TextArea>
                      </div>
                      <div className="w-full">
                        <Label>ATTACHED FILE</Label>
                        <FileUpload
                          label=""
                          accept="image/*,.pdf,.xlsx,.xls"
                          onFileChange={(file: File) => console.log(file)}
                        />
                      </div>

                      <div className="w-full">
                        <Label>
                          IMPLEMENT ACTION (การขยายผลงาน Action ล็อต)
                        </Label>
                        <TextArea id="cor_action"></TextArea>
                      </div>

                      <div className="w-full">
                        <Label>ATTACHED FILE</Label>
                        <FileUpload
                          label=""
                          accept="image/*,.pdf,.xlsx,.xls"
                          onFileChange={(file: File) => console.log(file)}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <Button type="primary">Save</Button>
        </div>
      </ComponentCard>

      <ComponentCard title="PART 5: INFORMATION">
        <div className="flex flex-1">
          <div className="w-full">
            <Label>IMPLEMENT ACTION (การขยายผลงาน Action ล็อต)</Label>
            <TextArea id="cor_action"></TextArea>
          </div>
          {/* <div className="w-full">
              <Label>COMMENT</Label>
              <TextArea id="comment"></TextArea>
            </div> */}
        </div>
        <div className="flex flex-1">
          <div className="w-full">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        </div>
      </ComponentCard>
      <ComponentCard title="PART 6 OOO">
        <div className="space-y-8">
          {data.map((person) => (
            <div key={person.id}>
              {/* <Label className="text-xl font-semibold mb-4">{person.label}</Label> */}
              <Label>{person.label}</Label>
              <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300 py-1 text-center text-sm">
                      DENY
                    </th>
                    <th className="border border-gray-300 py-1 text-center text-sm">
                      DETAILS
                    </th>
                    <th className="border border-gray-300 py-1 text-center text-sm">
                      DATE
                    </th>
                    <th className="border border-gray-300 py-1 text-center text-sm">
                      BY
                    </th>
                    <th className="border border-gray-300 py-1 text-center text-sm">
                      ATTACHED FILE
                    </th>
                    <th className="border border-gray-300 py-1 text-center text-sm">
                      CONFIRM
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.type}>
                      <td className="border border-gray-300 px-1 py-1 text-sm">
                        {row.type}
                      </td>
                      <td className="border border-gray-300 px-1 py-1">
                        {/* <input className="border border-gray-300 rounded px-2 py-1 w-full" /> */}
                        <Input id="comment" placeholder="กรอกรายละเอียด"></Input>
                      </td>
                      <td className="border border-gray-300 px-1 py-1">
                        <Input
                          type="date"
                          // className="border border-gray-300 rounded px-2 py-1 w-full"
                          disabled
                        />
                      </td>
                      <td className="border border-gray-300 px-1 py-1">
                        {/* <input className="border border-gray-300 rounded px-2 py-1 w-full" /> */}
                        <Input placeholder="กรอก Emp No." />
                      </td>
                      <td className="border border-gray-300 px-1 py-1">
                        {/* <input type="file" className="w-full" /> */}
                        <FileUpload
                          label=""
                          accept="image/*,.pdf,.xlsx,.xls"
                          onFileChange={(file: File) => console.log(file)}
                        />
                      </td>
                      <td className="border border-gray-300 px-1 py-1 space-x-2">
                        <div className="flex gap-1 justify-center">
                          <Button
                            style={{
                              backgroundColor: "#57CF61",
                              borderColor: "#57CF61",
                              color: "#fff",
                            }}
                          >
                            OK
                          </Button>
                          <Button type="primary" danger>
                            DENY
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex gap-3 py-2">
                <Label>Comment</Label>
              <TextArea id="remark"></TextArea></div>
            </div>
          ))}
        </div>
      </ComponentCard>
      <ComponentCard title="PART 6: GENERATE PROCESS FLOW">
        <div className="flex flex-col gap-2">
          <Label>DENY</Label>
          <Table
            dataSource={dataSource}
            columns={columns_deny}
            pagination={false}
            rowKey="key"
            bordered
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>REPLY</Label>
          <Table
            dataSource={dataSource}
            columns={columns_reply}
            pagination={false}
            rowKey="key"
            bordered
          />
        </div>
      </ComponentCard>

      <ComponentCard title="PART 7: FOLLOW UP">
        <div className="space-y-4">
          <Table
            dataSource={dataSourceFW}
            columns={columns_fw}
            pagination={false}
            rowKey="key"
            bordered
            style={{ width: "100%" }}
          />
        </div>
      </ComponentCard>
    </div>
  );
}
