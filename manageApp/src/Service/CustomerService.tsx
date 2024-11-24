import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import Pagination from "./Pagination";

interface Customer {
  id: number;
  customerId?: string;
  email?: string;
  marketingPerson?: string;
  full_name: string;
  gender: string;
  date_of_birth: string;
  phone_number: string;
  follow_up_date: string;
  follow_down_date: string;
  address: string;
  city: string;
  district: string;
  ward: string;
  detailed_info: string;
  notes: string;
  status: number;
  source: number;
  social_media: number;
  service: number[];
  comments: Array<{
    title: string;
    time: string;
    status_id: number;
  }>;
}

const CustomerService: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: 1,
      full_name: "Nguyen Van A",
      customerId: "4t56ht",
      gender: "Male",
      date_of_birth: "1990-01-01",
      phone_number: "0123456789",
      follow_up_date: "2024-11-25T10:00:00",
      follow_down_date: "2024-11-25T10:30:00",
      address: "123 Main Street, District 1",
      city: "Ho Chi Minh City",
      district: "District 1",
      ward: "Ward Ben Nghe",
      detailed_info: "https://facebook.com/nguyenvana",
      notes: "Interested in basic skincare services.",
      status: 1,
      source: 2,
      social_media: 1,
      service: [101, 102],
      comments: [
        {
          title: "Contacted via Facebook",
          time: "2024-11-24T09:00:00",
          status_id: 2,
        },
        {
          title: "Scheduled a consultation",
          time: "2024-11-25T10:00:00",
          status_id: 3,
        },
      ],
    },
    {
      id: 2,
      full_name: "Tran Thi B",
      customerId: "45sdft",
      gender: "Female",
      date_of_birth: "1985-05-15",
      phone_number: "0987654321",
      follow_up_date: "2024-11-26T14:00:00",
      follow_down_date: "2024-11-26T14:30:00",
      address: "456 Elm Street, District 3",
      city: "Ho Chi Minh City",
      district: "District 3",
      ward: "Ward Vo Thi Sau",
      detailed_info: "https://instagram.com/tranthib",
      notes: "Interested in advanced hair care packages.",
      status: 2, // e.g., Follow-up confirmed
      source: 3, // e.g., Walk-in
      social_media: 2, // e.g., Instagram
      service: [201, 202], // Service IDs
      comments: [
        {
          title: "Message sent on Instagram",
          time: "2024-11-23T18:00:00",
          status_id: 1,
        },
        {
          title: "Consultation scheduled",
          time: "2024-11-26T14:00:00",
          status_id: 2,
        },
      ],
    },
  ]);

  const [user, setUser] = useState<{ username: string; token: string } | null>(
    null
  );
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [newCustomer, setNewCustomer] = useState<Customer>({
    id: customers.length + 2, // Adjust this if needed for ID logic
    full_name: "",
    gender: "",
    date_of_birth: "",
    phone_number: "",
    follow_up_date: "",
    follow_down_date: "",
    address: "",
    city: "",
    district: "",
    ward: "",
    detailed_info: "",
    notes: "",
    status: 0,
    source: 0,
    social_media: 0,
    service: [],
    comments: [],
  });
  const [rows, setRows] = React.useState([
    {
      id: 1,
      date: "24-11-2024",
      result: "Liên hệ thành công",
      status: "Gọi lần sau",
    },
    { id: 2, date: "25-11-2024", result: "Đã chốt đơn", status: "Xác nhận" },
  ]);
  const [newRow, setNewRow] = React.useState({
    date: "",
    result: "",
    status: "Gọi lần sau",
  });
  const [showForm, setShowForm] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const rowsPerPage = 2;

  const totalPages = Math.ceil(rows.length / rowsPerPage);

  const currentRows = rows.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  React.useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);
  if (!user) {
    return <p>No user data found. Please log in.</p>;
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value,
    }));
  };

  const handleStatusChange = (id: number, value: string) => {
    setRows((prevRows) =>
      prevRows.map((row) => (row.id === id ? { ...row, status: value } : row))
    );
  };

  const handleRowInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewRow((prevRow) => ({
      ...prevRow,
      [name]: value,
    }));
  };

  const handleAddRow = () => {
    if (!newRow.date || !newRow.result) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    setRows((prevRows) => [
      ...prevRows,
      { id: prevRows.length + 1, ...newRow },
    ]);

    setNewRow({
      date: "",
      result: "",
      status: "Gọi lần sau",
    });

    setShowForm(false);
  };
  const handleAddCustomer = () => {
    setCustomers((prevCustomers) => [...prevCustomers, newCustomer]);
    setNewCustomer({
      id: customers.length + 2,
      full_name: "",
      gender: "",
      date_of_birth: "",
      phone_number: "",
      follow_up_date: "",
      follow_down_date: "",
      address: "",
      city: "",
      district: "",
      ward: "",
      detailed_info: "",
      notes: "",
      status: 0,
      source: 0,
      social_media: 0,
      service: [],
      comments: [],
    });
    setIsFormVisible(false);
  };

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
    console.log("User logged out");
  };

  const handleCreateCustomer = async () => {
    const accessToken = localStorage.getItem("token");
    try {
      const response = await fetch(
        "https://dev.thabicare.zenix.com.vn/api/v1/customers/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(newCustomer),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Customer created successfully:", data);
        alert("Customer created successfully!");
        setNewCustomer({
          id: 0,
          full_name: "",
          gender: "",
          date_of_birth: "",
          phone_number: "",
          follow_up_date: "",
          follow_down_date: "",
          address: "",
          city: "",
          district: "",
          ward: "",
          detailed_info: "",
          notes: "",
          status: 0,
          source: 0,
          social_media: 0,
          service: [],
          comments: [],
        });
      } else {
        console.error("Failed to create customer:", response.statusText);
        alert("Failed to create customer.");
      }
    } catch (error) {
      console.error("Error creating customer:", error);
      alert("Error creating customer.");
    }
  };
  const handleSaveAndSubmitCustomer = () => {
    handleAddCustomer();
    handleCreateCustomer();
  };
  return (
    <div style={{ position: "relative" }}>
      {isFormVisible && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1,
          }}
          onClick={() => setIsFormVisible(false)}
        />
      )}

      <div
        style={{
          padding: "1rem",
          fontFamily: "Arial, sans-serif",
          filter: isFormVisible ? "blur(4px)" : "none",
        }}
      >
        {/* Header */}
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            display: "flex",
            alignItems: "center",
            padding: "0.5rem 1rem",
            width: "100%",
            zIndex: 3,
          }}
        >
          <FontAwesomeIcon
            icon={faUserCircle}
            style={{
              fontSize: "20px",
              cursor: "pointer",
              color: "#F27900",
              marginRight: "0.5rem",
            }}
          />
          <p style={{ margin: 0, fontWeight: "bold" }}>Customer Service</p>
        </div>
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            display: "flex",
            alignItems: "center",
            padding: "0.5rem 1rem",
            width: "100%",
            zIndex: 3,
          }}
        >
          <FontAwesomeIcon
            icon={faUserCircle}
            style={{
              fontSize: "20px",
              cursor: "pointer",
              color: "#F27900",
              marginRight: "0.5rem",
            }}
          />
          <p style={{ margin: 0, fontWeight: "bold" }}>Customer Service</p>
        </div>

        {/* Top-Right Section */}
        <div
          style={{
            position: "fixed",
            top: "0",
            right: "0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-end",
            padding: "0.5rem 1rem",
            zIndex: 3,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                paddingRight: "10px",
              }}
            >
              <p style={{ margin: 0, fontWeight: "bold", textAlign: "right" }}>
                {user.username}
              </p>
              <p style={{ margin: 0, fontWeight: "bold", textAlign: "right" }}>
                Nhân viên kinh doanh
              </p>
            </div>
            <FontAwesomeIcon
              icon={faUserCircle}
              onClick={toggleDropdown}
              style={{
                fontSize: "40px",
                cursor: "pointer",
                color: "#000",
                marginRight: "10px",
              }}
            />
          </div>

          {/* Dropdown Menu */}
          {isDropdownVisible && (
            <div
              style={{
                position: "absolute",
                top: "60px",
                right: "10px",
                backgroundColor: "#fff",
                border: "1px solid #ddd",
                borderRadius: "4px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                zIndex: 4,
                width: "200px",
              }}
            >
              <ul style={{ listStyle: "none", margin: 0, padding: "0.5rem" }}>
                <li style={{ padding: "0.5rem 1rem", cursor: "pointer" }}>
                  Hồ sơ
                </li>
                <li
                  onClick={handleLogout}
                  style={{
                    padding: "0.5rem 1rem",
                    cursor: "pointer",
                    backgroundColor: "#f8d7da",
                    color: "#721c24",
                    borderRadius: "4px",
                    textAlign: "center",
                    marginTop: "0.5rem",
                  }}
                >
                  Đăng xuất
                </li>
              </ul>
            </div>
          )}

          {/* Row for Add Customer Button */}
          <button
            onClick={() => setIsFormVisible(true)}
            style={{
              padding: "0.5rem 1rem",
              fontSize: "1rem",
              backgroundColor: "#b58618",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            Thêm khách hàng
          </button>
        </div>

        <table
          className="table table-striped table-bordered"
          style={{ borderCollapse: "separate", borderSpacing: "25px" }}
        >
          <thead>
            <tr className="text-center" style={firstRowStyle}>
              <th scope="col">ID</th>
              <th scope="col">Mã KH</th>
              <th scope="col">Họ và tên</th>
              <th scope="col">Ngày sinh</th>
              <th scope="col">SĐT</th>
              <th scope="col">Email</th>
              <th scope="col">Người tiếp thị</th>
              <th scope="col">Nguồn</th>
              <th scope="col">Ghi chú</th>
              <th scope="col">Ngày tạo</th>
              <th scope="col">Giới tính</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className="text-center">
                <td style={tableCellStyle}>{customer.id}</td>
                <td style={tableCellStyle}>{customer.customerId}</td>
                <td style={tableCellStyle}>{customer.full_name}</td>
                <td style={tableCellStyle}>{customer.date_of_birth}</td>
                <td style={tableCellStyle}>{customer.phone_number}</td>
                <td style={tableCellStyle}>{customer.email}</td>
                <td style={tableCellStyle}>{customer.marketingPerson}</td>
                <td style={tableCellStyle}>{customer.source}</td>
                <td style={tableCellStyle}>{customer.notes}</td>
                <td style={tableCellStyle}>{customer.follow_up_date}</td>
                <td style={tableCellStyle}>{customer.gender}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Centered Add Customer Form */}
      {isFormVisible && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 2,
            width: "75%",
            backgroundColor: "#fff",
          }}
        >
          <form
            style={{
              position: "relative",
              border: "1px solid #ddd",
              borderRadius: "8px",
              backgroundColor: "#f9f9f9",
              borderTopLeftRadius: "8px",
              borderTopRightRadius: "8px",
            }}
          >
            {/* Header Section with Light Brown Background */}
            <div
              style={{
                backgroundColor: "#e4a52a",
                color: "#333",
                borderTopLeftRadius: "8px",
                borderTopRightRadius: "8px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                height: "30px",
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontSize: "0.8rem",
                  color: "white",
                  paddingLeft: "6px",
                }}
              >
                Tạo khách hàng
              </h3>
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsFormVisible(false)}
                style={{
                  backgroundColor: "transparent",
                  border: "0.2px solid #fff", // White border
                  fontSize: "0.8rem",
                  cursor: "pointer",
                  color: "#fff", // White icon color
                  borderRadius: "5%",
                  width: "20px",
                  height: "25px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "10px",
                  marginRight: "10px",
                }}
                title="Close"
              >
                &#10005; {/* Unicode for the close icon */}
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    marginLeft: "1rem",
                    marginBottom: "0.5rem",
                    display: "flex",
                    flexDirection: "column",
                    width: "200px",
                  }}
                >
                  <label>Họ và tên:</label>
                  <input
                    type="text"
                    name="full_name"
                    value={newCustomer.full_name}
                    onChange={handleInputChange}
                    style={{
                      padding: "0.5rem",
                      width: "100%",
                      height: "0.2rem",
                    }}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    fontSize: "0.4rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "110px",
                    }}
                  >
                    <div
                      style={{
                        marginLeft: "1rem",
                        marginBottom: "0.5rem",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <label>Nguồn khách hàng:</label>
                      <select name="source">
                        <option value="0">Website</option>
                        <option value="1">Giới thiệu</option>
                        <option value="2">Mạng xã hội</option>
                      </select>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "125px",
                    }}
                  >
                    <div
                      style={{
                        marginLeft: "1rem",
                        marginBottom: "0.5rem",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <label>Trạng thái:</label>
                      <select name="status">
                        <option value="0">Yêu cầu trải nghiệm</option>
                        <option value="1">Yêu cầu tư vấn</option>
                        <option value="2">Từ chối</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ marginLeft: "100px" }}>
                <div
                  style={{ display: "flex", gap: "10px", alignItems: "center" }}
                >
                  <label>Giới tính:</label>
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="male"
                    required
                  />
                  <label htmlFor="male">Nam</label>

                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="female"
                  />
                  <label htmlFor="female">Nữ</label>

                  <input type="radio" id="other" name="gender" value="other" />
                  <label htmlFor="other">Khác</label>
                </div>
              </div>
              <div
                style={{
                  marginLeft: "100px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <label>Ngày sinh:</label>
                <input
                  type="date"
                  name="date"
                  value={newRow.date}
                  onChange={handleRowInputChange}
                  required
                  style={{ width: "250%" }}
                />
              </div>
            </div>
            <h4
              style={{
                marginLeft: "1rem",
                marginTop: "0px",
                marginBottom: "0px",
              }}
            >
              Thông tin liên hệ
            </h4>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    marginLeft: "1rem",
                    marginBottom: "0.5rem",
                    display: "flex",
                    flexDirection: "column",
                    width: "200px",
                  }}
                >
                  <label>SDT:</label>
                  <input
                    type="text"
                    name="phone_number"
                    value={newCustomer.phone_number}
                    onChange={handleInputChange}
                    style={{
                      padding: "0.5rem",
                      width: "90%",
                      height: "0.2rem",
                    }}
                  />
                </div>
              </div>

              <div style={{ marginLeft: "110px" }}>
                <label>Email:</label>
                <input
                  type="text"
                  name="email"
                  value={newCustomer.email}
                  onChange={handleInputChange}
                  style={{
                    padding: "0.5rem",
                    width: "90%",
                    height: "0.2rem",
                  }}
                />
              </div>

              <div
                style={{
                  marginLeft: "145px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <label>Mạng xã hội:</label>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <select>
                    <option value="facebook">facebook</option>
                    <option value="youtube">youtube</option>
                    <option value="linkln">linkln</option>
                  </select>
                  <input
                    type="text"
                    name="source"
                    value={newCustomer.source}
                    onChange={handleInputChange}
                    style={{
                      padding: "0.5rem",
                      width: "90%",
                      height: "0.2rem",
                    }}
                  />
                </div>
              </div>
            </div>
            <h4
              style={{
                marginLeft: "1rem",
                marginTop: "0px",
                marginBottom: "0px",
              }}
            >
              Thông tin chi tiết
            </h4>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    marginLeft: "1rem",
                    marginBottom: "0.5rem",
                    display: "flex",
                    flexDirection: "column",
                    width: "200px",
                  }}
                >
                  <label>Sản phẩm quan tâm:</label>
                  <select
                    name="interestedProducts"
                    multiple
                    onChange={handleInputChange}
                    style={{ padding: "0.5rem", width: "100%" }}
                  >
                    <option
                      style={{
                        backgroundColor: "#b58618",
                        borderRadius: "5%",
                        color: "white",
                        margin: "10px",
                        textAlign: "center",
                      }}
                      value="product1"
                    >
                      Trị liệu dưỡng sinh
                    </option>
                    <option
                      style={{
                        backgroundColor: "#b58618",
                        borderRadius: "5%",
                        color: "white",
                        margin: "10px",
                        textAlign: "center",
                      }}
                      value="product2"
                    >
                      Xoa bóp cổ vai gáy
                    </option>
                  </select>
                  <label>Ghi chú:</label>
                  <input
                    type="text"
                    name="notes"
                    value={newCustomer.notes}
                    onChange={handleInputChange}
                    style={{
                      padding: "0.5rem",
                      width: "100%",
                      height: "0.2rem",
                    }}
                  />
                </div>
              </div>
              <div
                style={{
                  marginLeft: "110px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <label>Địa chỉ liên hệ:</label>
                <select
                  name="city"
                  style={{ padding: "0.3rem", width: "141%", marginTop: "5px" }}
                >
                  <option value="">Chọn địa chỉ</option>
                  <option value="hanoi">Hà Nội</option>
                  <option value="hochiminh">Hồ Chí Minh</option>
                  <option value="danang">Đà Nẵng</option>
                </select>
                <select
                  name="district"
                  style={{ padding: "0.3rem", width: "141%", marginTop: "5px" }}
                >
                  <option value="">Chọn địa chỉ</option>
                  <option value="hanoi">Ba Đình</option>
                  <option value="hochiminh">Cầu Giấy</option>
                  <option value="danang">Đống Đa</option>
                </select>
                <select
                  name="address"
                  style={{ padding: "0.3rem", width: "141%", marginTop: "5px" }}
                >
                  <option value="">Chọn địa chỉ</option>
                  <option value="hanoi">Chùa Láng</option>
                  <option value="hochiminh">Đê La Thành</option>
                  <option value="danang">Láng Hạ</option>
                </select>
                <input
                  type="text"
                  name="address"
                  value={newCustomer.address}
                  onChange={handleInputChange}
                  style={{ width: "137%", height: "20px", marginTop: "5px" }}
                />
              </div>

              <div
                style={{
                  marginLeft: "195px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <label>Chọn khung giờ:</label>
                <select
                  name="address"
                  style={{ padding: "0.3rem", width: "220%" }}
                >
                  <option value="">Chọn khung giờ</option>
                  <option value="hanoi">9.00 - 10.00</option>
                  <option value="hochiminh">10.00 - 11.00</option>
                  <option value="danang">14.00 - 15.00</option>
                  <option value="hochiminh">15.00 - 16.00</option>
                  <option value="danang">16.00 - 17.00</option>
                </select>
              </div>
            </div>

            {/* Bảng */}
            <p
              style={{
                marginLeft: "1rem",
                marginTop: "0px",
                marginBottom: "0px",
              }}
            >
              Thông tin chăm sóc khách hàng
            </p>
            <table
              style={{
                borderCollapse: "collapse",
                width: "100%",
                fontSize: "0.7rem",
                textAlign: "center",
              }}
            >
              <thead>
                <tr>
                  <th style={{ padding: "8px" }}>Lần</th>
                  <th style={{ padding: "8px" }}>Ngày</th>
                  <th style={{ padding: "8px" }}>Kết quả chăm sóc</th>
                  <th style={{ padding: "8px" }}>Cập nhật trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {currentRows.map((row) => (
                  <tr key={row.id}>
                    <td style={{ padding: "8px" }}>{row.id}</td>
                    <td style={{ padding: "8px" }}>{row.date}</td>
                    <td style={{ padding: "8px" }}>{row.result}</td>
                    <td style={{ padding: "8px" }}>
                      <select
                        value={row.status}
                        onChange={(e) =>
                          handleStatusChange(row.id, e.target.value)
                        }
                        style={{ padding: "0.5rem", width: "100%" }}
                      >
                        <option value="Gọi lần sau">Gọi lần sau</option>
                        <option value="Trải nghiệm">Trải nghiệm</option>
                        <option value="Xác nhận">Xác nhận</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>

              {/* Nút Hiển Thị Form */}
              <button
                onClick={() => setShowForm((prev) => !prev)}
                style={{
                  marginTop: "10px",
                  padding: "5px 10px",
                  backgroundColor: "#008CBA",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Thêm Thông Tin
              </button>

              {/* Use the Pagination Component */}
            </table>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
            {/* Form Thêm Thông Tin */}
            {showForm && (
              <div
                style={{
                  marginTop: "20px",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <div>
                  <label>Ngày: </label>
                  <input
                    type="date"
                    name="date"
                    value={newRow.date}
                    onChange={handleRowInputChange}
                    style={{ margin: "0 10px", padding: "5px" }}
                  />
                </div>
                <div>
                  <label>Kết quả chăm sóc: </label>
                  <input
                    type="text"
                    name="result"
                    value={newRow.result}
                    onChange={handleRowInputChange}
                    style={{
                      margin: "0 10px",
                      padding: "5px",
                      width: "200px",
                    }}
                  />
                </div>
                <div>
                  <label>Trạng thái: </label>
                  <select
                    name="status"
                    value={newRow.status}
                    onChange={handleRowInputChange}
                    style={{ margin: "0 10px", padding: "5px" }}
                  >
                    <option value="Gọi lần sau">Gọi lần sau</option>
                    <option value="Trải nghiệm">Trải nghiệm</option>
                    <option value="Xác nhận">Xác nhận</option>
                  </select>
                </div>
                <button
                  onClick={handleAddRow}
                  style={{
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                    width: "10%",
                  }}
                >
                  Tạo
                </button>
              </div>
            )}
            <div style={{ textAlign: "right" }}>
              <button
                type="button"
                onClick={handleSaveAndSubmitCustomer}
                style={{
                  padding: "0.5rem 1rem",
                  fontSize: "0.6rem",
                  backgroundColor: "#28a745",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  marginRight: "0.5rem",
                }}
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsFormVisible(false)}
                style={{
                  padding: "0.5rem 1rem",
                  fontSize: "0.6rem",
                  backgroundColor: "#dc3545",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

const tableCellStyle = {
  borderBottom: "1px solid #ddd",
};

const firstRowStyle = {
  fontWeight: "bold",
  backgroundColor: "#f8f9fa",
};

const styles = `
      @keyframes slide-up {
        from {
        transform: translate(-50%, 60%);
  }
      to {
        transform: translate(-50%, -50%);
  }
}
      `;

export default CustomerService;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
