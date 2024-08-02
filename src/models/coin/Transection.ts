import mongoose, { Schema, Document } from 'mongoose';

export interface ITransaction extends Document {
  user: mongoose.Types.ObjectId;
  amount: number;
  type: 'earn' | 'spend';
  description: string;
  timestamp: Date;
  relatedEntity?: {
    kind: string;
    item: mongoose.Types.ObjectId;
  };
}

const TransactionSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['earn', 'spend'], required: true },
  description: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  relatedEntity: {
    kind: String,
    item: { type: Schema.Types.ObjectId, refPath: 'relatedEntity.kind' }
  }
});

export default mongoose.model<ITransaction>('Transaction', TransactionSchema);