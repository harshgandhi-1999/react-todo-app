import React,{useState} from "react";
import { Form, Button, Input, Typography,message } from "antd";
import Label from "../../../components/Label";
import axiosInstance from "../../../utils/axiosInstance";
import { useAuth } from "../../../context/auth";

const { Title } = Typography;

const ResetPassword = () => {
  const [btnLoading,setbtnLoading] = useState(false);

  const {authUser,logout} = useAuth()

  const handlePasswordReset = (e)=>{
    console.log(e);
    setbtnLoading(true)
    if(authUser!==null){
      axiosInstance.put(`/user/resetPassword/${authUser}`,{
        currentPassword: e.current_password,
        newPassword: e.new_password,
      })
      .then((res)=>{
        setbtnLoading(false)
        console.log(res);
        message.success(res.data.message);
      })
      .catch(err=>{
        setbtnLoading(false)
        console.log(err.response);
        if (err.response) {
          if (err.response.status === 401) {
            logout();
          } else {
            message.error(err.response.data.message)
          }
        } else {
          message.error(err.message);
          console.log(err.message);
        }
      })
    }
  }

  return (
    <div style={{ marginBottom: "20px" }}>
      <Title level={4} style={{ color: "#fff" }}>
        Change Your Password
      </Title>
      <div className="reset-password-container">
        <Form layout="vertical" name="update-password-form" onFinish={handlePasswordReset}>
            <Form.Item
              label={
                <Label text="Current Password" style={{ color: "#fff" }} />
              }
              name="current_password"
              rules={[
                {
                  required: true,
                  message: "Please provide current-password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label={<Label text="New Password" style={{ color: "#fff" }} />}
              name="new_password"
              rules={[
                { required: true, message: "Please provide new password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
          <Button type="primary" htmlType="submit" loading={btnLoading}>
            Change Password
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;
