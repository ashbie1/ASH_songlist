import React, { useState } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import axios from 'axios';
import PropTypes from 'prop-types';

const Add = ({ onAdd }) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const onFinish = async (values) => {
    try {
      const response = await axios.post('https://candid-capybara-620aae.netlify.app/.netlify/functions/api', values);
      onAdd(response.data);
      message.success('Author added successfully');
      form.resetFields();
      setOpen(false);
    } catch (error) {
      message.error('Failed to add author');
    }
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>Add Author</Button>
      <Modal title="Add Author" open={open} onCancel={handleCancel} footer={null}>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item name="artist" label="Artist" rules={[{ required: true, message: 'Artist is required' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="song" label="Song" rules={[{ required: true, message: 'Song is required' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="ratings" label="Ratings" rules={[{ required: true, message: 'Ratings are required' }]}>
            <Input type="number" min={1} max={5} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Add</Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

Add.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default Add;
