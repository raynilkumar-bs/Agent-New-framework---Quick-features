import type { Meta, StoryObj } from "@storybook/react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";

const meta: Meta = {
  title: "UI/Form",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

// ── Profile Form ─────────────────────────────────────────────────────────────

type ProfileValues = {
  businessName: string;
  email: string;
};

const ProfileFormDemo = () => {
  const form = useForm<ProfileValues>({
    defaultValues: { businessName: "", email: "" },
  });

  const onSubmit = (data: ProfileValues) => {
    alert(`Saved: ${JSON.stringify(data, null, 2)}`);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-sm space-y-4"
      >
        <FormField
          control={form.control}
          name="businessName"
          rules={{ required: "Business name is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Name</FormLabel>
              <FormControl>
                <Input placeholder="Acme Coffee Roasters" {...field} />
              </FormControl>
              <FormDescription>
                This is the name displayed on your public profile.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email address",
            },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input type="email" placeholder="hello@acme.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Save Profile
        </Button>
      </form>
    </Form>
  );
};

export const ProfileForm: Story = {
  render: () => <ProfileFormDemo />,
};

// ── Login Form ───────────────────────────────────────────────────────────────

type LoginValues = {
  email: string;
  password: string;
};

const LoginFormDemo = () => {
  const form = useForm<LoginValues>({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data: LoginValues) => {
    alert(`Login: ${data.email}`);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-sm space-y-4"
      >
        <div className="space-y-1 mb-2">
          <h2 className="text-lg font-medium text-foreground">Sign In</h2>
          <p className="text-sm text-muted-foreground">
            Enter your credentials to access your dashboard.
          </p>
        </div>
        <FormField
          control={form.control}
          name="email"
          rules={{ required: "Email is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@company.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          rules={{
            required: "Password is required",
            minLength: { value: 8, message: "Password must be at least 8 characters" },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Sign In
        </Button>
      </form>
    </Form>
  );
};

export const LoginForm: Story = {
  render: () => <LoginFormDemo />,
};

// ── With Select ──────────────────────────────────────────────────────────────

type RoleValues = {
  name: string;
  email: string;
  role: string;
};

const WithSelectDemo = () => {
  const form = useForm<RoleValues>({
    defaultValues: { name: "", email: "", role: "" },
  });

  const onSubmit = (data: RoleValues) => {
    alert(`Invite: ${JSON.stringify(data, null, 2)}`);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-sm space-y-4"
      >
        <div className="space-y-1 mb-2">
          <h2 className="text-lg font-medium text-foreground">Invite Team Member</h2>
          <p className="text-sm text-muted-foreground">
            Add a new member to your business account.
          </p>
        </div>
        <FormField
          control={form.control}
          name="name"
          rules={{ required: "Name is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Alex Johnson" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          rules={{ required: "Email is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Work Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="alex@company.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          rules={{ required: "Please select a role" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role…" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="agent">Agent</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Determines what this member can access.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Send Invite
        </Button>
      </form>
    </Form>
  );
};

export const WithSelect: Story = {
  render: () => <WithSelectDemo />,
};
