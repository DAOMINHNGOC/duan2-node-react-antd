import React, { useEffect, useState } from 'react'
import { IProduct } from '../../../types/products'
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Select } from 'antd';
import { ICategory } from '../../../types/category';
import type { FormInstance } from 'antd/es/form';

type IProps = {
    products: IProduct[],
    categories: ICategory[],
    onUpdate: (product: IProduct) => void
}
const UpdateProduct = ({ onUpdate, products, categories }: IProps) => {
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const concurren = products.find((pro) => pro._id == String(id));
        formRef.current?.setFieldsValue(concurren);
    })

    const formRef = React.useRef<FormInstance>(null);
    const { Option } = Select;
    const navigate = useNavigate();
    const onFinish = (values: any) => {
        onUpdate(values);
        // navigate("/admin/products");
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const onReset = () => {
        formRef.current?.resetFields();
    };

    const onFill = () => {
        formRef.current?.setFieldsValue({ note: 'Hello world!', gender: 'male' });
    };
    const onGenderChange = (value: string) => {
        switch (value) {
            case 'male':
                formRef.current?.setFieldsValue({ note: 'Hi, man!' });
                break;
            case 'female':
                formRef.current?.setFieldsValue({ note: 'Hi, lady!' });
                break;
            case 'other':
                formRef.current?.setFieldsValue({ note: 'Hi there!' });
                break;
            default:
                break;
        }
    };

    return (
        <div>
            <h1 className='text-center'>Update Products</h1>
            <Form
                name="control-ref"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                ref={formRef}
            >
                <Form.Item name="categoryId" label="CategoryId" rules={[{ required: true }]}>
                    <Select
                        placeholder="Select a option and change input text above"
                        onChange={onGenderChange}
                        allowClear
                    >
                        {categories.map((cate, index) => {
                            return (
                                <Option key={index} value={cate._id}>{cate.name}</Option>
                            )
                        })}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your name products!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Price"
                    name="price"
                    rules={[{ required: true, message: 'Please input price!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: 'Please input description!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Image"
                    name="image"
                    rules={[{ required: true, message: 'Please input image!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    <Button htmlType="button" onClick={onReset}>
                        Reset
                    </Button>
                    <Button type="link" htmlType="button" onClick={onFill}>
                        Fill form
                    </Button>

                </Form.Item>
            </Form>
        </div>
    )
}

export default UpdateProduct