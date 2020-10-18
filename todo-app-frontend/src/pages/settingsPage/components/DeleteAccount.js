import React from "react";
import { Button, Typography, message, Modal } from "antd";
import axiosInstance from "../../../utils/axiosInstance";
import { useAuth } from "../../../context/auth";
import { ExclamationCircleFilled } from "@ant-design/icons";

const { Title, Paragraph } = Typography;
const { confirm } = Modal;

const DeleteAccount = () => {
  const { authUser, logout } = useAuth();
  const handleDeleteAccount = () => {
    if (authUser !== null) {
      confirm({
        title: "Are you sure you want to delete your Account?",
        icon: <ExclamationCircleFilled />,
        content:
          "Please be aware that all data will be permanently lost if you delete your account",
        okText: "DELETE",
        okType: "danger",
        cancelText: "CLOSE",
        onOk() {
          axiosInstance
            .delete(`/user/delete/${authUser}`)
            .then((res) => {
              message.success(res.data.message);
              logout();
            })
            .catch((err) => {
              console.log(err);
              if (err.response) {
                if (err.response.status === 401) {
                  logout();
                } else {
                  message.error(err.response.data.message);
                }
              } else {
                message.error(err.message);
              }
            });
        },
        onCancel() {
          // console.log("Cancel");
        },
      });
    }
  };
  return (
    <div style={{ marginBottom: "20px" }}>
      <Title level={4} style={{ color: "#fff" }}>
        Delete Your Account
      </Title>
      <Paragraph
        style={{ color: "rgba(255,255,255,0.4)", fontStyle: "italic" }}
      >
        Delete your account and all information related to your account such as
        your account information and all the todos.
      </Paragraph>
      <Button type="danger" htmlType="submit" onClick={handleDeleteAccount}>
        DELETE ACCOUNT
      </Button>
    </div>
  );
};

export default DeleteAccount;
