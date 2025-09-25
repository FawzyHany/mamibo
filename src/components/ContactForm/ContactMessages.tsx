'use client';

import { useContacts } from '@/hooks/useSubmitContact'; // make sure this path is correct
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ContactMessages() {
  const { data: messages, isLoading } = useContacts();

  if (isLoading) return <div>Loading...</div>;
  if (!messages?.length) return <div>No messages yet.</div>;

  return (
    <div className="space-y-4">
      {messages.map((msg) => (
        <Card key={msg.id}>
          <CardHeader>
            <CardTitle>
              {msg.name} – {msg.email}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {msg.phone && <p className="text-sm text-gray-500">📞 {msg.phone}</p>}
            <p>{msg.message}</p>
            <p className="text-xs text-muted-foreground mt-2">
              {new Date(msg.createdAt).toLocaleString()}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
