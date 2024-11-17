import React from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { LockOutlined } from '@ant-design/icons';

const PasswordResetForm = () => {
    const [form] = Form.useForm();

    const onReset = async () => {
        try {
        } catch (error) {}
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <Card style={{ width: '600px' }} className="w-full max-w-md">
                <h2 className="text-2xl font-bold text-left mb-8">
                    Reset Password
                </h2>
                <p className="text-gray-500 text-left mb-8">
                    Please enter your new password
                </p>

                <Form
                    form={form}
                    name="passwordReset"
                    onFinish={onReset}
                    layout="vertical"
                    autoComplete="off"
                >
                    <Form.Item
                        name="newPassword"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your new password!',
                            },
                            {
                                min: 8,
                                message:
                                    'Password must be at least 8 characters long',
                            },
                        ]}
                    >
                        <span className="text-gray-700 font-semibold mb-1 block">
                            New Password
                        </span>
                        <Input.Password
                            prefix={<LockOutlined className="text-gray-400" />}
                            placeholder="Enter new password"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item
                        name="confirmPassword"
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            {
                                min: 8,
                                message:
                                    'Password must be at least 8 characters long',
                            },
                        ]}
                    >
                        <span className="text-gray-700 font-semibold mb-1 block">
                            Confirm New Password
                        </span>
                        <Input.Password
                            prefix={<LockOutlined className="text-gray-400" />}
                            placeholder="Confirm new password"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="w-full custom-button-orange"
                            size="large"
                        >
                            Reset Password
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default PasswordResetForm;
