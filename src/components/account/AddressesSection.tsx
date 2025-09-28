import { useUserAddresses } from '@/hooks/useUserAddress'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Dialog, DialogContent, DialogTitle } from '@radix-ui/react-dialog'
import { DialogHeader } from '../ui/dialog'
import { EditAddressForm } from './EditAddressForm'

const AddressesSection = () => {
  const { data: addresses, isLoading, error } = useUserAddresses()
  const [open, setOpen] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState<unknown | null>(null)

  if (isLoading) return <p>Loading addresses...</p>
  if (error) return <p className="text-red-500">Failed to load addresses</p>

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Addresses</h2>
        <Button
          onClick={() => {
            setSelectedAddress(null)
            setOpen(true)
          }}
        >
          Add Address
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {addresses?.map((addr) => (
          <Card key={addr.id} className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{addr.address}</span>
                {addr.isDefault && (
                  <span className="text-xs text-green-600">Default</span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 text-sm text-gray-600">
              <p>Building: {addr.building}</p>
              <p>Floor: {addr.floor}</p>
              <p>Flat: {addr.flat}</p>
              <p>Landmark: {addr.landmark}</p>
              {addr.lat && addr.lng && (
                <p>
                  📍 {addr.lat}, {addr.lng}
                </p>
              )}
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => {
                  setSelectedAddress(addr)
                  setOpen(true)
                }}
              >
                Edit
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedAddress ? "Edit Address" : "Add Address"}
            </DialogTitle>
          </DialogHeader>
          {typeof selectedAddress === 'object' && selectedAddress !== null && (
  <EditAddressForm
    address={selectedAddress as any}
    onSuccess={() => setOpen(false)}
  />
)}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddressesSection