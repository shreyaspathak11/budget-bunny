
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Transaction, Category, TransactionsByMonth } from "../../types";

interface TransactionsState {
    categories: Category[];
    transactions: Transaction[];
    transactionsByMonth: TransactionsByMonth;
}

const initialState: TransactionsState = {
    categories: [],
    transactions: [],
    transactionsByMonth: {
        totalExpenses: 0,
        totalIncome: 0
    },
};
  

const transactionsSlice = createSlice({
    name: "transactions",
    initialState,
    reducers: {
        setCategories(state, action: PayloadAction<Category[]>) {
            state.categories = action.payload;
        },
        setTransactions(state, action: PayloadAction<Transaction[]>) {
            state.transactions = action.payload;
        },
        setTransactionsByMonth(state, action: PayloadAction<TransactionsByMonth>) {
            state.transactionsByMonth = action.payload;
        },
    },
});

export const { setCategories, setTransactions, setTransactionsByMonth } = transactionsSlice.actions;

export default transactionsSlice.reducer;