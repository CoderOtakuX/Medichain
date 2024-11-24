import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export default function VerifyMedicine() {
  const [batchNumber, setBatchNumber] = useState('')
  const [medicineDetails, setMedicineDetails] = useState(null)
  const [error, setError] = useState('')

  const handleVerify = async () => {
    if (!batchNumber) {
      setError('Please enter a batch number')
      return
    }

    // Simulating blockchain interaction for demo purposes
    const sampleMedicines = {
      'BATCH123': {
        name: 'Aspirin',
        manufacturer: 'PharmaCorp',
        manufactureDate: Date.now() - 30 * 24 * 60 * 60 * 1000,
        expiryDate: Date.now() + 365 * 24 * 60 * 60 * 1000,
        isVerified: true
      },
      'BATCH456': {
        name: 'Ibuprofen',
        manufacturer: 'MediCo',
        manufactureDate: Date.now() - 60 * 24 * 60 * 60 * 1000,
        expiryDate: Date.now() + 730 * 24 * 60 * 60 * 1000,
        isVerified: true
      },
      'BATCH789': {
        name: 'Paracetamol',
        manufacturer: 'HealthPharm',
        manufactureDate: Date.now() - 90 * 24 * 60 * 60 * 1000,
        expiryDate: Date.now() + 548 * 24 * 60 * 60 * 1000,
        isVerified: true
      }
    }

    if (sampleMedicines[batchNumber]) {
      setMedicineDetails(sampleMedicines[batchNumber])
      setError('')
    } else {
      setMedicineDetails(null)
      setError('Medicine not found or not verified')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Verify Your Medicine</CardTitle>
          <CardDescription>Enter the batch number to verify your medicine</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="batchNumber">Batch Number</Label>
              <Input
                id="batchNumber"
                type="text"
                placeholder="Enter batch number"
                value={batchNumber}
                onChange={(e) => setBatchNumber(e.target.value)}
              />
            </div>
            {error && <p className="text-red-600">{error}</p>}
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleVerify} className="w-full">Verify</Button>
        </CardFooter>
        {medicineDetails && (
          <CardContent className="mt-4 bg-secondary p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Medicine Details:</h3>
            <p><strong>Name:</strong> {medicineDetails.name}</p>
            <p><strong>Manufacturer:</strong> {medicineDetails.manufacturer}</p>
            <p><strong>Manufacture Date:</strong> {new Date(medicineDetails.manufactureDate).toLocaleDateString()}</p>
            <p><strong>Expiry Date:</strong> {new Date(medicineDetails.expiryDate).toLocaleDateString()}</p>
            <p><strong>Verified:</strong> {medicineDetails.isVerified ? 'Yes' : 'No'}</p>
          </CardContent>
        )}
      </Card>
    </div>
  )
}

