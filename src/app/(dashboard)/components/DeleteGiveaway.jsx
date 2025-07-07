import React from "react";

export default function DeleteGiveaway() {
  return (
    <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogTitle className="text-lg font-semibold">
          Delete Banner
        </DialogTitle>
        <DialogBody className="text-sm text-gray-600">
          Are you sure you want to delete this banner? This action cannot be
          undone.
        </DialogBody>
        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="outline" onClick={() => setConfirmOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
