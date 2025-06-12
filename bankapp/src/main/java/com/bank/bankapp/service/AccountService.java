package com.bank.bankapp.service;

import com.bank.bankapp.Account;
import java.util.*;

import org.springframework.stereotype.Service;

@Service
public class AccountService {

    private Map<Long, Account> accounts = new HashMap<>();

    public AccountService() {
        // example account
        accounts.put(1L, new Account(1L, "Sample Account", 1000.0));
    }

    public List<Account> getAllAccounts() {
        return new ArrayList<>(accounts.values());
    }

    public Account getAccountById(Long id) {
        return accounts.get(id);
    }

    public void saveAccount(Account account) {
        accounts.put(account.getId(), account);
    }

    public void deleteAccount(Long id) {
        accounts.remove(id);
    }
}