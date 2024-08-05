import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppContext } from '@/context/AppContext';
import { createWebSocketConnection, updateUserProfile } from '@/services/api';

export interface UserProfile {
  name: string;
  age: string;
  gender: string;
  location: string;
  healthIssues: string;
}

const UserProfile: React.FC = () => {
  const { userProfile, setUserProfile } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [localProfile, setLocalProfile] = useState<UserProfile>(userProfile || {
    name: '',
    age: '',
    gender: '',
    location: '',
    healthIssues: '',
  });

  useEffect(() => {
    const socket = createWebSocketConnection((data) => {
      if (data.type === 'user_profile_update') {
        setUserProfile(data.profile);
      }
    });

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [setUserProfile]);

  useEffect(() => {
    if (userProfile) {
      setLocalProfile(userProfile);
    }
  }, [userProfile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUserProfile(localProfile);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (!isEditing) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Uživatelský profil</CardTitle>
        </CardHeader>
        <CardContent>
          <p><strong>Jméno:</strong> {localProfile.name}</p>
          <p><strong>Věk:</strong> {localProfile.age}</p>
          <p><strong>Pohlaví:</strong> {localProfile.gender}</p>
          <p><strong>Lokalita:</strong> {localProfile.location}</p>
          <p><strong>Zdravotní problémy:</strong> {localProfile.healthIssues}</p>
          <Button onClick={() => setIsEditing(true)} className="mt-4">Upravit profil</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Upravit profil</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Jméno</Label>
            <Input id="name" name="name" value={localProfile.name} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="age">Věk</Label>
            <Input id="age" name="age" value={localProfile.age} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="gender">Pohlaví</Label>
            <Input id="gender" name="gender" value={localProfile.gender} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="location">Lokalita</Label>
            <Input id="location" name="location" value={localProfile.location} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="healthIssues">Zdravotní problémy</Label>
            <Input id="healthIssues" name="healthIssues" value={localProfile.healthIssues} onChange={handleChange} />
          </div>
          <Button type="submit" className="w-full">Uložit profil</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default UserProfile;