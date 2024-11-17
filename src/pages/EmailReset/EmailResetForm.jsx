import React from "react";
import { Form, Input, Button, Card, message } from "antd";
import { MailOutlined } from "@ant-design/icons";

const EmailResetForm = ({ onResetSuccess }) => {
  const [form] = Form.useForm();

  const onReset = async (values) => {
    // Log the submitted values to the console
    console.log("Submitted values:", values);

    try {
      // Simulate an API call with a mock delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      message.success("Reset link sent!");
      onResetSuccess();
    } catch (error) {
      message.error("Failed to send reset email. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card style={{ width: "600px" }} className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-left mb-8">Reset Password</h2>
        <p className="text-gray-500 text-left mb-8">
          Enter your email address and we'll send you a link to reset your
          password
        </p>

        <Form
          form={form}
          name="emailReset"
          onFinish={onReset}
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                message: "Please enter a valid email!",
              },
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <div>
              <span className="text-gray-700 font-semibold mb-1 block">
                Email Address
              </span>
              <Input
                prefix={<MailOutlined className="text-gray-400" />}
                placeholder="Enter your email"
                size="large"
              />
            </div>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full primary-button"
              size="large"
            >
              Send Reset Link
            </Button>
          </Form.Item>

          <div className="text-center">
            <a href="/login" className="text-orange-400 hover:text-orange-600">
              Back to Login
            </a>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default EmailResetForm;
