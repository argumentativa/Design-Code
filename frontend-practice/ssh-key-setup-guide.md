# SSH Key Setup Guide

## 1. Generate SSH Key Pair

### Generate a new SSH key (recommended: Ed25519)
```bash
ssh-keygen -t ed25519 -C "your-email@example.com"
```

### Alternative: RSA key (if Ed25519 not supported)
```bash
ssh-keygen -t rsa -b 4096 -C "your-email@example.com"
```

### Options explained:
- `-t ed25519`: Key type (most secure)
- `-t rsa -b 4096`: RSA with 4096 bits (legacy compatibility)
- `-C "email"`: Comment to identify the key

## 2. Key Generation Process

When prompted:
1. **File location**: Press Enter for default (`~/.ssh/id_ed25519`) or specify custom path
2. **Passphrase**: Enter a strong passphrase (optional but recommended)

Example output:
```
Generating public/private ed25519 key pair.
Enter file in which to save the key (/home/user/.ssh/id_ed25519): 
Enter passphrase (empty for no passphrase): 
Enter same passphrase again: 
Your identification has been saved in /home/user/.ssh/id_ed25519
Your public key has been saved in /home/user/.ssh/id_ed25519.pub
```

## 3. Verify Key Creation

```bash
# List SSH keys
ls -la ~/.ssh/

# View public key content
cat ~/.ssh/id_ed25519.pub
```

## 4. Add SSH Key to SSH Agent

```bash
# Start SSH agent
eval "$(ssh-agent -s)"

# Add private key to agent
ssh-add ~/.ssh/id_ed25519
```

## 5. Copy Public Key

### Method 1: Copy to clipboard (macOS)
```bash
pbcopy < ~/.ssh/id_ed25519.pub
```

### Method 2: Copy to clipboard (Linux)
```bash
xclip -sel clip < ~/.ssh/id_ed25519.pub
```

### Method 3: Display and copy manually
```bash
cat ~/.ssh/id_ed25519.pub
```

## 6. Configure SSH for Different Services

### Create SSH config file
```bash
touch ~/.ssh/config
chmod 600 ~/.ssh/config
```

### Example SSH config (`~/.ssh/config`):
```
# GitHub
Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519

# GitLab
Host gitlab.com
    HostName gitlab.com
    User git
    IdentityFile ~/.ssh/id_ed25519

# Custom server
Host myserver
    HostName server.example.com
    User username
    Port 22
    IdentityFile ~/.ssh/id_ed25519

# Multiple GitHub accounts
Host github-work
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_work
```

## 7. Add Public Key to Services

### GitHub:
1. Go to Settings > SSH and GPG keys
2. Click "New SSH key"
3. Paste your public key
4. Test: `ssh -T git@github.com`

### GitLab:
1. Go to Preferences > SSH Keys
2. Paste your public key
3. Test: `ssh -T git@gitlab.com`

### DigitalOcean Droplets:
1. Control Panel > Settings > Security > SSH Keys
2. Add your public key
3. Use when creating new droplets

### AWS EC2:
1. EC2 Console > Key Pairs
2. Actions > Import Key Pair
3. Paste public key content

## 8. Test SSH Connection

```bash
# Test GitHub connection
ssh -T git@github.com

# Test custom server
ssh username@server.example.com

# Test with verbose output (debugging)
ssh -vT git@github.com
```

## 9. Security Best Practices

### File Permissions
```bash
chmod 700 ~/.ssh
chmod 600 ~/.ssh/id_ed25519
chmod 644 ~/.ssh/id_ed25519.pub
chmod 600 ~/.ssh/config
```

### Multiple Keys for Different Purposes
```bash
# Work key
ssh-keygen -t ed25519 -f ~/.ssh/id_ed25519_work -C "work@company.com"

# Personal key  
ssh-keygen -t ed25519 -f ~/.ssh/id_ed25519_personal -C "personal@email.com"

# Server deployment key
ssh-keygen -t ed25519 -f ~/.ssh/id_ed25519_deploy -C "deploy@server.com"
```

## 10. Troubleshooting

### Common Issues:

**Permission denied (publickey)**
```bash
# Check SSH agent
ssh-add -l

# Add key to agent
ssh-add ~/.ssh/id_ed25519

# Check permissions
ls -la ~/.ssh/
```

**Key not being used**
```bash
# Force specific key
ssh -i ~/.ssh/id_ed25519 user@server.com

# Debug connection
ssh -v user@server.com
```

**Multiple keys conflict**
```bash
# Clear all keys from agent
ssh-add -D

# Add specific key
ssh-add ~/.ssh/id_ed25519
```

## 11. Automated Deployment Setup

### For CI/CD pipelines, create deployment keys:

```bash
# Generate deployment key (no passphrase for automation)
ssh-keygen -t ed25519 -f ~/.ssh/deploy_key -N "" -C "deploy@ci-system"

# Add to authorized_keys on target server
cat ~/.ssh/deploy_key.pub >> ~/.ssh/authorized_keys
```

## 12. Backup Your Keys

```bash
# Backup SSH directory
cp -r ~/.ssh ~/ssh-backup-$(date +%Y%m%d)

# Or create encrypted backup
tar -czf ssh-backup-$(date +%Y%m%d).tar.gz ~/.ssh
gpg -c ssh-backup-$(date +%Y%m%d).tar.gz
```

## Quick Reference Commands

```bash
# Generate key
ssh-keygen -t ed25519 -C "your-email@example.com"

# Copy public key (macOS)
pbcopy < ~/.ssh/id_ed25519.pub

# Test GitHub
ssh -T git@github.com

# List keys in agent
ssh-add -l

# Set correct permissions
chmod 700 ~/.ssh && chmod 600 ~/.ssh/id_ed25519 && chmod 644 ~/.ssh/id_ed25519.pub
```