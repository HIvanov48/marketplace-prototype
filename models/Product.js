import mongoose from 'mongoose'

const VariantSchema = new mongoose.Schema({
  name: String,
  price: Number,
  stock: Number
}, { _id: true })

const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: String,
  variants: [VariantSchema]
})

ProductSchema.index({ name: 'text', description: 'text', category: 'text' })

export default mongoose.model('Product', ProductSchema)
