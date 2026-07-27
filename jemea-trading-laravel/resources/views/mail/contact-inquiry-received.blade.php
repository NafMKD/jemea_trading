<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>New contact inquiry</title>
    </head>
    <body style="margin: 0; background: #edf1f3; color: #283844; font-family: Arial, sans-serif;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding: 32px 16px;">
            <tr>
                <td align="center">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 640px; background: #ffffff; border: 1px solid #dce3e7;">
                        <tr>
                            <td style="background: #283844; padding: 24px 32px;">
                                <h1 style="margin: 0; color: #6bcdd2; font-size: 24px;">New contact inquiry</h1>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 32px;">
                                <p><strong>Name:</strong> {{ $inquiry->name }}</p>
                                <p><strong>Email:</strong> {{ $inquiry->email }}</p>
                                @if ($inquiry->company)
                                    <p><strong>Company:</strong> {{ $inquiry->company }}</p>
                                @endif
                                @if ($inquiry->product_interest)
                                    <p><strong>Product interest:</strong> {{ $inquiry->product_interest }}</p>
                                @endif
                                <div style="margin-top: 24px; border-top: 1px solid #dce3e7; padding-top: 20px;">
                                    <p style="margin-bottom: 8px;"><strong>Message:</strong></p>
                                    <p style="margin: 0; white-space: pre-wrap; line-height: 1.65;">{{ $inquiry->message }}</p>
                                </div>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
</html>
