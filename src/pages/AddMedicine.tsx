import React, { useState } from 'react'
import { useWeb3 } from '../contexts/Web3Context'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import QRCode from 'qrcode.react'

export default function AddMedicine() {
  const { contract, account } = useWeb3()
  const [medicineDetails, setMedicineDetails] = useState({
    name: '',
    manufacturer: '',
    manufactureDate: '',
    expiryDate: '',
    batchNumber: ''
  })
  const [qrCode, setQrCode] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setMedicineDetails(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { batchNumber, name, manufacturer, manufactureDate, expiryDate } = medicineDetails
      await contract.methods.addMedicine(
        batchNumber,
        name,
        manufacturer,
        new Date(manufactureDate).getTime() / 1000,
        new Date(expiryDate).getTime() / 1000
      ).send({ from: account })
      setQrCode(batchNumber)
      toast({
        title: "Medicine Added",
        description: "The medicine has been successfully added to the blockchain.",
      })
    } catch (error) {
      console.error('Error adding medicine:', error)
      toast({
        title: "Error",
        description: "There was an error adding the medicine. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Add New Medicine</CardTitle>
          <CardDescription>Enter the details of the new medicine to add to the blockchain</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Medicine Name</Label>
                <Input id="name" name="name" value={medicineDetails.name} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="manufacturer">Manufacturer</Label>
                <Input id="manufacturer" name="manufacturer" value={medicineDetails.manufacturer} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="manufactureDate">Manufacture Date</Label>
                <Input id="manufactureDate" name="manufactureDate" type="date" value={medicineDetails.manufactureDate} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input id="expiryDate" name="expiryDate" type="date" value={medicineDetails.expiryDate} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="batchNumber">Batch Number</Label>
                <Input id="batchNumber" name="batchNumber" value={medicineDetails.batchNumber} onChange={handleChange} required />
              </div>
            </div>
            <Button type="submit" className="w-full">Add Medicine</Button>
          </form>
        </CardContent>
        {qrCode && (
          <CardFooter className="flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-2">QR Code for Batch {qrCode}</h3>
            <QRCode value={qrCode} size={200} />
          </CardFooter>
        )}
      </Card>
    </div>
  )
}

