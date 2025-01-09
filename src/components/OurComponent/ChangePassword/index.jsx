import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';


const ChangePassword = () => {
    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false
      });
    
    const togglePasswordVisibility = (field) => {
        setShowPasswords(prev => ({
          ...prev,
          [field]: !prev[field]
        }));
      };

  return (
    <div className="flex-1 overflow-auto">
          <Card className="m-6 bg-white shadow-sm">
            <CardContent className="p-6">
              <h1 className="text-xl font-semibold mb-6">Ganti Sandi</h1>
              <p className="text-sm text-gray-600 mb-6">Silahkan ganti dengan yang baru</p>

              <form className="space-y-6">
                {/* Current Password */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Kata sandi sekarang</label>
                  <div className="relative">
                    <Input
                      type={showPasswords.current ? "text" : "password"}
                      className="pr-10"
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
                      type={showPasswords.new ? "text" : "password"}
                      className="pr-10"
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
                      type={showPasswords.confirm ? "text" : "password"}
                      className="pr-10"
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
                  >
                    Selesai
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
  )
}

export default ChangePassword;