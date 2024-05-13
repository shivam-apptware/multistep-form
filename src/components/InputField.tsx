// InputField.tsx

import React from 'react';

interface InputFieldProps {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ label, name, type, value, onChange }) => {
  return (
    <div>
      <label>{label}:</label>
      {type === 'textarea' ? (
        <textarea name={name} value={value} onChange={onChange} style={{ borderRadius: '5px', padding: '8px', border: '1px solid #ccc' }} />
      ) : (
        <input type={type} name={name} value={value} onChange={onChange} style={{ borderRadius: '5px', padding: '8px', border: '1px solid #ccc' }} />
      )}
    </div>
  );
};

export default InputField;
