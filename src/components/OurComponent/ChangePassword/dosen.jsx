import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useMutation } from '@tanstack/react-query';
import { changePassword } from '@/service/account/changePassword';

const ChangePasswordDosen = () => {

  
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const changePasswordMutation = useMutation({
    mutationFn: changePassword,
    onSuccess: (data) => {
      toast({
        title: 'Berhasil',
        description: 'Password berhasil diubah',
        variant: 'default',
      });
      // Reset form
      setFormData({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message + 'GAGAL MERUBAH PASSWORD',
        variant: 'destructive',
      });
    },
  });

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    changePasswordMutation.mutate({
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword,
      confirmPassword: formData.confirmPassword,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex-1 overflow-auto">
      <Card className="bg-white shadow-sm">
        <CardContent className="p-6">
          <h1 className="text-xl font-semibold mb-1">Ganti Sandi</h1>
          <p className="text-sm text-gray-600 mb-1">Silahkan ganti dengan yang baru</p>
          <hr className='mb-9' />

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Current Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Kata sandi sekarang</label>
              <div className="relative">
                <Input
                  name="oldPassword"
                  type={showPasswords.current ? "text" : "password"}
                  className="pr-10"
                  value={formData.oldPassword}
                  onChange={handleChange}
                  disabled={changePasswordMutation.isPending}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => togglePasswordVisibility('current')}
                >
                  {showPasswords.current ? 
                    <EyeOff className="h-4 w-4 text-gray-500" /> : 
                    <Eye className="h-4 w-4 text-gray-500" />
                  }
                </Button>
              </div>
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Kata sandi baru</label>
              <div className="relative">
                <Input
                  name="newPassword"
                  type={showPasswords.new ? "text" : "password"}
                  className="pr-10"
                  value={formData.newPassword}
                  onChange={handleChange}
                  disabled={changePasswordMutation.isPending}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => togglePasswordVisibility('new')}
                >
                  {showPasswords.new ? 
                    <EyeOff className="h-4 w-4 text-gray-500" /> : 
                    <Eye className="h-4 w-4 text-gray-500" />
                  }
                </Button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Konfirmasi sandi</label>
              <div className="relative">
                <Input
                  name="confirmPassword"
                  type={showPasswords.confirm ? "text" : "password"}
                  className="pr-10"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={changePasswordMutation.isPending}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => togglePasswordVisibility('confirm')}
                >
                  {showPasswords.confirm ? 
                    <EyeOff className="h-4 w-4 text-gray-500" /> : 
                    <Eye className="h-4 w-4 text-gray-500" />
                  }
                </Button>
              </div>
            </div>

            <div className="flex justify-center">
              <Button 
                type="submit" 
                className="bg-blue-500 hover:bg-blue-600 text-white px-8"
                disabled={changePasswordMutation.isPending}
              >
                {changePasswordMutation.isPending ? 'Memproses...' : 'Selesai'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default ChangePasswordDosen;