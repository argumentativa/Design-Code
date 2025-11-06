# Bluehost SSH Key Setup Guide

## Prerequisites

⚠️ **Important**: SSH access is only available on certain Bluehost plans:
- VPS hosting plans
- Dedicated server plans
- Some shared hosting plans (check with support)

## Step 1: Enable SSH Access in Bluehost

1. **Log into your Bluehost cPanel**
2. **Navigate to**: Advanced > SSH Access
3. **Enable SSH Access** if not already enabled
4. **Note your SSH details**:
   - Hostname: Usually your domain or server IP
   - Port: Usually 22 (default) or custom port
   - Username: Your cPanel username

## Step 2: Generate SSH Key Pair

On your local machine (macOS):

```bash
# Generate SSH key pair
ssh-keygen -t ed25519 -C "your-email@bluehost.com"
```

When prompted:
- **File location**: Press Enter for default or use: `~/.ssh/id_bluehost`
- **Passphrase**: Enter a strong passphrase (recommended)

### Alternative for older systems:
```bash
ssh-keygen -t rsa -b 4096 -C "your-email@bluehost.com" -f ~/.ssh/id_bluehost
```

## Step 3: Copy Your Public Key

```bash
# Display your public key
cat ~/.ssh/id_bluehost.pub

# Copy to clipboard (macOS)
pbcopy < ~/.ssh/id_bluehost.pub
```

## Step 4: Add Public Key to Bluehost

### Method 1: Through cPanel (Recommended)
1. **Log into Bluehost cPanel**
2. **Go to**: Advanced > SSH Access
3. **Click**: "Manage SSH Keys" or "Import Key"
4. **Paste your public key** into the text area
5. **Click**: "Import" or "Add Key"
6. **Authorize the key** (may require additional step)

### Method 2: Manual Upload via File Manager
1. **In cPanel**: Files > File Manager
2. **Navigate to**: Home directory
3. **Create `.ssh` directory** if it doesn't exist
4. **Set permissions** on `.ssh` folder to 700
5. **Create/edit** `authorized_keys` file
6. **Paste your public key** on a new line
7. **Set permissions** on `authorized_keys` to 600

### Method 3: Via SSH (if you have password access)
```bash
# First, connect with password
ssh your-username@your-domain.com

# Create .ssh directory
mkdir -p ~/.ssh
chmod 700 ~/.ssh

# Create authorized_keys file
nano ~/.ssh/authorized_keys

# Paste your public key, save and exit
# Set correct permissions
chmod 600 ~/.ssh/authorized_keys
```

## Step 5: Configure SSH on Your Local Machine

Create/edit your SSH config file:

```bash
nano ~/.ssh/config
```

Add your Bluehost configuration:

```
# Bluehost Configuration
Host bluehost
    HostName your-domain.com
    User your-cpanel-username
    Port 22
    IdentityFile ~/.ssh/id_bluehost
    IdentitiesOnly yes

# Alternative with IP address
Host bluehost-ip
    HostName your.server.ip.address
    User your-cpanel-username
    Port 22
    IdentityFile ~/.ssh/id_bluehost
    IdentitiesOnly yes
```

Set correct permissions:
```bash
chmod 600 ~/.ssh/config
```

## Step 6: Add Key to SSH Agent

```bash
# Start SSH agent
eval "$(ssh-agent -s)"

# Add your Bluehost key
ssh-add ~/.ssh/id_bluehost
```

## Step 7: Test SSH Connection

```bash
# Test connection using config alias
ssh bluehost

# Or test directly
ssh your-username@your-domain.com

# Test with verbose output (for troubleshooting)
ssh -v bluehost
```

## Step 8: Verify File Permissions

On your Bluehost server, ensure correct permissions:

```bash
# Check permissions
ls -la ~/.ssh/

# Set correct permissions if needed
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```

## Common Bluehost-Specific Issues

### Issue 1: SSH Not Enabled
- Contact Bluehost support to enable SSH access
- May require plan upgrade for shared hosting

### Issue 2: Wrong Hostname
```bash
# Try different hostname formats
ssh username@yourdomain.com
ssh username@server.yourdomain.com  
ssh username@box123.bluehost.com
```

### Issue 3: Custom SSH Port
Some Bluehost servers use custom ports:
```bash
# Check cPanel for correct port
ssh -p 2222 username@yourdomain.com
```

### Issue 4: Key Not Recognized
```bash
# Force specific key usage
ssh -i ~/.ssh/id_bluehost username@yourdomain.com

# Clear SSH agent and re-add key
ssh-add -D
ssh-add ~/.ssh/id_bluehost
```

## Bluehost cPanel SSH Access Locations

Different cPanel versions may show SSH access in different locations:
- **Advanced** > SSH Access
- **Security** > SSH Access  
- **Terminal** > SSH Access
- Contact support if you can't find it

## Git Repository Access via SSH

Once SSH is working, you can use it for Git operations:

```bash
# Clone repository
git clone ssh://username@yourdomain.com/~/git/repository.git

# Or if using GitHub/GitLab from your server
git clone git@github.com:username/repository.git
```

## Security Best Practices for Bluehost

1. **Use strong passphrases** on your SSH keys
2. **Disable password authentication** once key auth is working:
   ```bash
   # Edit SSH config (if you have sudo access)
   sudo nano /etc/ssh/sshd_config
   
   # Set: PasswordAuthentication no
   # Restart SSH service
   sudo systemctl restart sshd
   ```
3. **Use different keys** for different purposes
4. **Regularly rotate keys**
5. **Monitor SSH access logs**

## Troubleshooting Commands

```bash
# Check if SSH service is running
systemctl status sshd

# View SSH logs
tail -f /var/log/auth.log

# Test SSH configuration
sshd -t

# Check SSH agent keys
ssh-add -l

# Debug connection issues
ssh -vvv username@yourdomain.com
```

## Quick Reference for Bluehost

```bash
# Generate key for Bluehost
ssh-keygen -t ed25519 -f ~/.ssh/id_bluehost -C "bluehost-server"

# Copy public key
pbcopy < ~/.ssh/id_bluehost.pub

# Add to SSH agent
ssh-add ~/.ssh/id_bluehost

# Test connection
ssh -i ~/.ssh/id_bluehost your-username@your-domain.com
```

## Contact Bluehost Support

If you encounter issues:
- **Phone**: Available 24/7
- **Live Chat**: Through cPanel or website  
- **Ticket System**: Submit support request
- **Knowledge Base**: Search for SSH-related articles

Remember to mention your hosting plan type when contacting support about SSH access.