import React from 'react';
import PageHeader from '@/components/shared/PageHeader';
import SectionWrapper from '@/components/shared/SectionWrapper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck, FileText, Camera } from 'lucide-react';

const PoliciesPage = () => {
  return (
    <div>
      <PageHeader title="Our Policies" subtitle="Transparency and trust are core to our operations.">
        <FileText className="h-16 w-16 text-primary mx-auto mt-4" />
      </PageHeader>

      <SectionWrapper id="policies-content">
        <div className="space-y-8 max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <ShieldCheck className="h-6 w-6 mr-2 text-primary" /> Data Privacy Policy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-2">
                At Let's Donate, we are committed to protecting your privacy. This policy outlines how we collect, use, and safeguard your personal information.
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>We collect personal information (name, email, phone) only when voluntarily provided by you for donations, volunteering, or newsletter subscriptions.</li>
                <li>Your information is used solely for the purpose it was collected for and to communicate updates about our activities.</li>
                <li>We do not sell, trade, or rent your personal information to third parties.</li>
                <li>We implement industry-standard security measures to protect your data.</li>
                <li>You can request access to, correction of, or deletion of your personal data at any time by contacting us.</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Camera className="h-6 w-6 mr-2 text-primary" /> Photo and Video Usage Policy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-2">
                We love capturing moments from our events to share the impact of our work. However, we prioritize the dignity and safety of all individuals involved.
              </p>
              <p className="font-semibold text-foreground">
                "All photos and videos of Let's Donate events must be approved before being shared publicly."
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mt-2">
                <li>Consent will be obtained from participants (or their guardians for minors) before taking photos or videos where individuals are identifiable.</li>
                <li>Images and videos are used for promoting Let's Donate's mission, fundraising, and reporting to stakeholders.</li>
                <li>If you have concerns about an image or video featuring you or your child, please contact us immediately for review and potential removal.</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <FileText className="h-6 w-6 mr-2 text-primary" /> Terms and Conditions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-2">
                By using our website and services, you agree to the following terms:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>All content on this website is for informational purposes only.</li>
                <li>Let's Donate reserves the right to modify or discontinue any program or service without prior notice.</li>
                <li>While we strive for accuracy, we do not warrant that all information on the site is complete or error-free.</li>
                <li>Donations made are non-refundable unless specified otherwise under exceptional circumstances.</li>
                <li>Users must not use this website for any unlawful purpose.</li>
              </ul>
              <p className="text-sm text-muted-foreground mt-4">
                For any queries regarding our policies, please contact us at <a href="mailto:policies@letsdonate.org" className="text-primary hover:underline">policies@letsdonate.org</a>.
              </p>
            </CardContent>
          </Card>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default PoliciesPage;