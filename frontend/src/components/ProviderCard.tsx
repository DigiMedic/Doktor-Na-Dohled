import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ProviderCardProps {
  name: string;
  specialty: string;
  location: string;
  contact: string;
}

const ProviderCard: React.FC<ProviderCardProps> = ({ name, specialty, location, contact }) => {
  return (
    <Card className="w-full max-w-md mb-4">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p><strong>Specializace:</strong> {specialty}</p>
        <p><strong>Lokalita:</strong> {location}</p>
        <p><strong>Kontakt:</strong> {contact}</p>
        <Button className="mt-4 w-full">Kontaktovat</Button>
      </CardContent>
    </Card>
  );
};

export default ProviderCard;